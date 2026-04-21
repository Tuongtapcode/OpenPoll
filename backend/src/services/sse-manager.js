const EventEmitter = require('events');

/**
 * SSE Manager - Uses EventEmitter pattern for reliable real-time broadcasts.
 * Each poll has its own event channel. SSE connections listen for events.
 */
class SSEManager extends EventEmitter {
  constructor() {
    super();
    // Track connected clients for metrics
    this.clients = new Map(); // Map<pollId, Set<Response>>
    this.setMaxListeners(0); // No limit on listeners
  }

  /**
   * Add a new SSE client for a specific poll
   */
  addClient(pollId, res) {
    const id = String(pollId);

    if (!this.clients.has(id)) {
      this.clients.set(id, new Set());
    }
    this.clients.get(id).add(res);

    // Listen for vote events on this poll
    const handler = (data) => {
      try {
        if (!res.destroyed && res.writable) {
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        }
      } catch (error) {
        console.error(`[SSE] Write error:`, error.message);
        this.removeClient(id, res);
      }
    };

    // Store handler reference on response for cleanup
    res._sseHandler = handler;
    res._ssePollId = id;

    this.on(`poll:${id}`, handler);

    console.log(`[SSE] Client connected to poll ${id}. Active: ${this.clients.get(id).size}`);
  }

  /**
   * Remove a client when they disconnect
   */
  removeClient(pollId, res) {
    const id = String(pollId);

    if (this.clients.has(id)) {
      this.clients.get(id).delete(res);

      // Remove event listener
      if (res._sseHandler) {
        this.removeListener(`poll:${id}`, res._sseHandler);
        delete res._sseHandler;
      }

      // Clean up empty sets
      if (this.clients.get(id).size === 0) {
        this.clients.delete(id);
      }

      console.log(`[SSE] Client disconnected from poll ${id}. Active: ${this.clients.has(id) ? this.clients.get(id).size : 0}`);
    }
  }

  /**
   * Broadcast data to all clients watching a specific poll
   */
  broadcast(pollId, data) {
    const id = String(pollId);
    const clientCount = this.clients.has(id) ? this.clients.get(id).size : 0;

    console.log(`[SSE] Broadcasting to ${clientCount} clients for poll ${id}`);

    // Emit event - all listeners for this poll will receive it
    this.emit(`poll:${id}`, data);
  }

  /**
   * Get total number of active SSE connections (for metrics)
   */
  getActiveConnections() {
    let total = 0;
    this.clients.forEach((clients) => {
      total += clients.size;
    });
    return total;
  }

  /**
   * Get connections count for a specific poll
   */
  getPollConnections(pollId) {
    const id = String(pollId);
    if (!this.clients.has(id)) return 0;
    return this.clients.get(id).size;
  }
}

// Singleton instance
const sseManager = new SSEManager();

module.exports = sseManager;
