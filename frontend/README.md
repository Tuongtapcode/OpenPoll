# Báo Cáo Dự Án OpenPoll
## Nền Tảng Bình Chọn Thời Gian Thực Với Giám Sát Hệ Thống

**Ngày nộp:** Tháng 4, 2026  
**Loại dự án:** Dự án học phần - Kiến Trúc Hệ Thống & Giám Sát

---

## Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Mục Tiêu & Tính Năng Chính](#mục-tiêu--tính-năng-chính)
3. [Kiến Trúc & Công Nghệ](#kiến-trúc--công-nghệ)
4. [Cấu Trúc Hệ Thống](#cấu-trúc-hệ-thống)
5. [Thiết Kế Cơ Sở Dữ Liệu](#thiết-kế-cơ-sở-dữ-liệu)
6. [Luồng Xử Lý Dữ Liệu](#luồng-xử-lý-dữ-liệu)
7. [Các Thành Phần Chính](#các-thành-phần-chính)
8. [Giải Pháp Real-time](#giải-pháp-real-time)
9. [Hệ Thống Giám Sát & Metrics](#hệ-thống-giám-sát--metrics)
10. [Quy Trình Triển Khai](#quy-trình-triển-khai)
11. [Kết Luận](#kết-luận)

---

## Tổng Quan Dự Án

### Giới Thiệu

**OpenPoll** là một nền tảng bình chọn (polling platform) được xây dựng với công nghệ hiện đại, cho phép người dùng tạo các cuộc khảo sát và thu thập phiếu bầu từ cộng đồng một cách thời gian thực. Đồng thời, hệ thống tích hợp **Prometheus** và **Grafana** để giám sát và phân tích hiệu năng của nền tảng.

### Mục Đích Chính

Dự án này được phát triển nhằm đạt được những mục tiêu giáo dục sau:

- Hiểu và áp dụng kiến trúc hệ thống phân tán (Distributed Systems Architecture)
- Thiết kế hệ thống có khả năng mở rộng (Scalability)
- Triển khai công nghệ thời gian thực (Real-time Technology)
- Xây dựng hệ thống giám sát và theo dõi hiệu năng (Monitoring & Observability)
- Thực hành Container Orchestration với Docker & Docker Compose

---

## Mục Tiêu & Tính Năng Chính

### 1. Mục Tiêu Chính

| Mục Tiêu | Mô Tả |
|---------|-------|
| **Nền tảng bình chọn thời gian thực** | Tạo các cuộc khảo sát và nhận kết quả bình chọn cập nhật tức thì |
| **Tạo traffic thực tế** | Sinh ra lượng dữ liệu và yêu cầu đủ lớn để thực hành giám sát hệ thống |
| **Giám sát Prometheus + Grafana** | Cấu hình các chỉ số (metrics) phù hợp và trực quan hóa dữ liệu |

### 2. Tính Năng Chính

#### 2.1 Tính Năng Cho Người Tạo Poll (Poll Owner)

- ✅ Đăng ký và đăng nhập tài khoản
- ✅ Tạo câu hỏi bình chọn với nhiều lựa chọn
- ✅ Quản lý danh sách các poll đã tạo
- ✅ Xem kết quả bình chọn trực tiếp
- ✅ Đóng/xóa poll
- ✅ Chia sẻ link bình chọn công khai

#### 2.2 Tính Năng Cho Người Bình Chọn (Voter)

- ✅ Truy cập poll qua link công khai
- ✅ Bình chọn mà **không cần đăng nhập** (Anonymous Voting)
- ✅ Xem kết quả bình chọn **cập nhật real-time**
- ✅ Biểu đồ trực quan thay đổi tức thì khi có phiếu bầu mới
- ✅ Chặn vote lặp lại từ cùng một thiết bị (sử dụng Fingerprint)

#### 2.3 Tính Năng Monitoring

- ✅ Endpoint `/metrics` cho Prometheus
- ✅ Theo dõi số lượng yêu cầu HTTP
- ✅ Theo dõi số lượng kết nối SSE đang hoạt động
- ✅ Theo dõi tổng số vote
- ✅ Theo dõi sức khỏe server (RAM, CPU)
- ✅ Dashboard Grafana để trực quan hóa

---

## Kiến Trúc & Công Nghệ

### 1. Tech Stack Tổng Quát

```
┌─────────────────────────────────────────────────────┐
│               Frontend Layer                         │
│  Next.js 14 | TypeScript | Tailwind CSS | Redux    │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│               Backend Layer                          │
│  Node.js | Express | MongoDB | SSE                 │
└─────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────┐
│           Monitoring & Deployment                    │
│  Prometheus | Grafana | Docker | Docker Compose    │
└─────────────────────────────────────────────────────┘
```

### 2. Chi Tiết Công Nghệ

#### Frontend (Client)

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| Next.js | 14+ | Framework React với SSR/SSG |
| TypeScript | - | Type safety cho JavaScript |
| Tailwind CSS | - | Styling & UI Components |
| Redux Toolkit | - | State Management |
| Redux Saga | - | Side Effects Management |
| Recharts | - | Biểu đồ dữ liệu real-time |
| Axios | - | HTTP Client |

#### Backend (Server)

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| Node.js | 18+ | JavaScript Runtime |
| Express.js | 4+ | Web Framework |
| MongoDB | 5+ | NoSQL Database |
| prom-client | - | Prometheus Metrics |
| JWT | - | Authentication |
| bcryptjs | - | Password Hashing |

#### Deployment & Monitoring

| Công Nghệ | Mục Đích |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container Orchestration |
| Prometheus | Metrics Collection |
| Grafana | Metrics Visualization |

### 3. Tại Sao Chọn SSE Thay Vì WebSocket?

**Server-Sent Events (SSE)** được chọn vì:

- 📌 **Đơn giản hơn:** Chỉ cần `EventSource` từ phía client, không cần library phức tạp
- 📌 **Phù hợp cho một chiều:** SSE tối ưu cho việc server đẩy dữ liệu sang client (không cần client gửi lên server)
- 📌 **Tự động reconnect:** Trình duyệt tự động kết nối lại khi mất kết nối
- 📌 **Tiết kiệm tài nguyên:** Ít overhead so với WebSocket
- 📌 **Hỗ trợ tốt:** Hầu hết trình duyệt hiện đại đều hỗ trợ

---

## Cấu Trúc Hệ Thống

### 1. Sơ Đồ Kiến Trúc

```
┌────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Pages:                                               │  │
│  │ - Home         - Dashboard                           │  │
│  │ - Login/Register - Create Poll                       │  │
│  │ - Voting Page  - Poll Results                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Features (Feature-Based Architecture):              │  │
│  │ - auth (Login/Register)                             │  │
│  │ - poll (Tạo & quản lý poll)                         │  │
│  │ - vote (Bình chọn & kết quả)                        │  │
│  │ - dashboard (Thống kê)                              │  │
│  │ - home (Landing page)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Redux Store & Redux Saga                             │  │
│  │ (State management & Side effects)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
              ↑↓ (HTTP + SSE)
┌────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes:                                              │  │
│  │ - /auth (Login, Register)                           │  │
│  │ - /polls (CRUD operations)                          │  │
│  │ - /votes (Submit vote)                              │  │
│  │ - /metrics (Prometheus metrics)                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Controllers:                                         │  │
│  │ - AuthController                                    │  │
│  │ - PollController                                    │  │
│  │ - VoteController                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Services & Utilities:                                │  │
│  │ - SSE Manager (Quản lý kết nối SSE)               │  │
│  │ - Middleware (Auth, Error, Metrics)                │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
              ↓↑
┌────────────────────────────────────────────────────────────┐
│                   MongoDB Database                          │
│  Collections: users, polls, options, votes                 │
└────────────────────────────────────────────────────────────┘
              ↓↑
┌────────────────────────────────────────────────────────────┐
│              Prometheus + Grafana                           │
│  Quét metrics từ /metrics endpoint mỗi 15 giây            │
└────────────────────────────────────────────────────────────┘
```

### 2. Cấu Trúc Thư Mục

#### Backend

```
backend/
├── src/
│   ├── app.js                    # Express app initialization
│   ├── server.js                 # Server entry point
│   ├── controllers/
│   │   ├── auth-controller.js    # Xử lý đăng nhập/đăng ký
│   │   ├── poll-controller.js    # CRUD Poll
│   │   └── vote-controller.js    # Xử lý vote
│   ├── middleware/
│   │   ├── auth.js               # JWT Authentication
│   │   ├── error-handler.js      # Global error handling
│   │   └── metrics.js            # Prometheus metrics recording
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Poll.js               # Poll schema
│   │   └── Vote.js               # Vote schema
│   ├── routes/
│   │   ├── auth-routes.js        # /auth endpoints
│   │   ├── poll-routes.js        # /polls endpoints
│   │   ├── vote-routes.js        # /votes endpoints
│   │   └── metrics-routes.js     # /metrics endpoint
│   ├── services/
│   │   └── sse-manager.js        # SSE connection management
│   └── utils/
│       ├── api-error.js          # Custom error class
│       └── generate-fingerprint.js # Device fingerprinting
├── package.json
├── Dockerfile
└── docker-compose.yml
```

#### Frontend

```
frontend/src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx                  # Home page
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── polls/
│   └── vote/
├── components/
│   ├── layout/                   # Layout components
│   └── ui/                       # Reusable UI components
├── features/                     # Feature-based architecture
│   ├── auth/                     # Authentication feature
│   ├── poll/                     # Poll management feature
│   ├── vote/                     # Voting feature
│   ├── dashboard/                # Dashboard feature
│   └── home/                     # Home feature
├── lib/                          # Utilities
├── store/                        # Redux store
└── types/                        # Global TypeScript types
```

---

## Thiết Kế Cơ Sở Dữ Liệu

### 1. Sơ Đồ ERD (Entity-Relationship Diagram)

```
┌─────────────────┐
│     Users       │
├─────────────────┤
│ id (PK)         │
│ email           │
│ password_hash   │
│ created_at      │
│ updated_at      │
└─────────────────┘
        ↑ 1
        │ (owns)
        │ *
┌─────────────────┐       ┌──────────────┐
│     Polls       │       │   Options    │
├─────────────────┤       ├──────────────┤
│ id (PK)         │──1:*──│ id (PK)      │
│ user_id (FK)    │       │ poll_id (FK) │
│ title           │       │ text         │
│ type            │       │ created_at   │
│ status          │       └──────────────┘
│ created_at      │
│ updated_at      │
└─────────────────┘
        ↑ 1
        │
        │ *
┌─────────────────────┐
│     Votes           │
├─────────────────────┤
│ id (PK)             │
│ poll_id (FK)        │
│ option_id (FK)      │
│ voter_fingerprint   │
│ ip_address          │
│ created_at          │
└─────────────────────┘
```

### 2. Chi Tiết Collections

#### Users Collection

```javascript
{
  _id: ObjectId,
  email: String,           // Unique, required
  password_hash: String,   // bcrypt hash
  created_at: Date,
  updated_at: Date
}
```

#### Polls Collection

```javascript
{
  _id: ObjectId,
  user_id: ObjectId,              // Reference to User
  title: String,                  // Câu hỏi poll
  type: String,                   // "single-choice", "multiple-choice"
  status: String,                 // "active", "closed"
  vote_count: Number,             // Tổng số vote
  created_at: Date,
  updated_at: Date
}
```

#### Options Collection

```javascript
{
  _id: ObjectId,
  poll_id: ObjectId,              // Reference to Poll
  text: String,                   // Nội dung lựa chọn
  vote_count: Number,             // Số lượt vote cho option này
  created_at: Date
}
```

#### Votes Collection

```javascript
{
  _id: ObjectId,
  poll_id: ObjectId,              // Reference to Poll
  option_id: ObjectId,            // Reference to Option
  voter_fingerprint: String,      // Device fingerprint để chặn spam
  ip_address: String,             // IP address
  created_at: Date
}
```

### 3. Chỉ Số & Performance

| Index | Trường | Mục Đích |
|-------|--------|---------|
| PRIMARY | User._id | |
| UNIQUE | User.email | Tìm kiếm user theo email |
| PRIMARY | Poll._id | |
| FOREIGN | Poll.user_id | Tìm poll của user |
| PRIMARY | Option._id | |
| FOREIGN | Option.poll_id | Tìm options của poll |
| PRIMARY | Vote._id | |
| FOREIGN | Vote.poll_id | Tìm votes của poll |
| UNIQUE | (Vote.poll_id, Vote.voter_fingerprint) | Chặn vote lặp |

---

## Luồng Xử Lý Dữ Liệu

### 1. Luồng Tạo Poll (Create Poll)

```
Owner
  │
  ├─→ Truy cập trang "Create Poll"
  │
  ├─→ Điền câu hỏi + các lựa chọn
  │
  ├─→ Click "Create"
  │
  └─→ Frontend gửi POST /polls/create (có JWT token)
        │
        ├─→ Backend xác thực JWT
        │
        ├─→ Validate dữ liệu (title, options)
        │
        ├─→ Lưu vào MongoDB:
        │   - Polls collection
        │   - Options collection
        │
        ├─→ Trả về Poll object + share link
        │
        └─→ Frontend hiển thị link chia sẻ
```

### 2. Luồng Bình Chọn (Voting Flow)

```
Voter
  │
  ├─→ Mở link poll (link công khai)
  │
  ├─→ Frontend thiết lập kết nối SSE tới server
  │   └─→ Backend: new EventSource('/polls/{pollId}/sse')
  │
  ├─→ Frontend nhận poll data và hiển thị
  │
  ├─→ Voter xem danh sách options
  │
  ├─→ Voter click vote cho một option
  │
  ├─→ Frontend gửi POST /votes/submit
  │   ├─ poll_id
  │   ├─ option_id
  │   └─ voter_fingerprint (device ID)
  │
  └─→ Backend xử lý:
        │
        ├─→ Kiểm tra voter_fingerprint (đã vote chưa?)
        │
        ├─→ Lưu vào Votes collection
        │
        ├─→ Cập nhật vote_count trong Options
        │
        ├─→ Gửi sự kiện SSE tới tất cả client kết nối
        │   └─→ Payload: {poll_id, option_id, new_vote_count}
        │
        └─→ Frontend nhận SSE event
            └─→ Cập nhật biểu đồ real-time
```

### 3. Luồng Giám Sát (Monitoring Flow)

```
Prometheus (cấu hình)
  │
  ├─→ Mỗi 15 giây (scrape interval)
  │
  └─→ Gửi GET /metrics
        │
        └─→ Backend (prom-client middleware)
            │
            ├─→ Đếm tổng HTTP requests
            ├─→ Tính response time
            ├─→ Đếm active SSE connections
            ├─→ Tính tổng votes
            ├─→ Lấy CPU/Memory usage
            │
            └─→ Trả về dữ liệu theo định dạng Prometheus
                  │
                  └─→ Prometheus lưu dữ liệu time-series
                      │
                      └─→ Grafana query & visualize
```

---

## Các Thành Phần Chính

### 1. Frontend Components

#### Authentication Feature (`features/auth/`)

```
features/auth/
├── components/
│   ├── login-form.tsx           # Form đăng nhập
│   └── register-form.tsx        # Form đăng ký
├── pages/
│   ├── login-page.tsx           # Trang login
│   └── register-page.tsx        # Trang register
├── services/
│   └── auth-service.ts          # Gọi API auth
├── store/
│   ├── auth-slice.ts            # Redux slice
│   └── auth-saga.ts             # Side effects
└── types.ts                     # Interfaces (IUser, ILoginPayload, etc.)
```

**Chức năng chính:**
- Đăng ký email + password
- Đăng nhập với JWT token
- Lưu token vào localStorage
- Quản lý session

#### Poll Feature (`features/poll/`)

```
features/poll/
├── components/
│   ├── create-poll-form.tsx     # Form tạo poll
│   └── poll-card.tsx            # Hiển thị poll item
├── pages/
│   └── create-poll-page.tsx     # Trang tạo poll
├── services/
│   └── poll-service.ts          # Gọi API poll
├── store/
│   ├── poll-slice.ts            # Redux slice
│   └── poll-saga.ts             # Side effects
└── types.ts                     # IPoll, IOption, etc.
```

**Chức năng chính:**
- Tạo poll mới (title + multiple options)
- Lấy danh sách poll
- Xóa/đóng poll
- Quản lý state poll

#### Vote Feature (`features/vote/`)

```
features/vote/
├── components/
│   ├── option-list.tsx          # Danh sách options để chọn
│   └── poll-result-chart.tsx    # Biểu đồ kết quả
├── hooks/
│   ├── use-poll-sse.ts          # Hook kết nối SSE
│   └── index.ts                 # Re-export
├── pages/
│   └── voting-page.tsx          # Trang vote
├── services/
│   └── vote-service.ts          # Gọi API vote
├── store/
│   ├── vote-slice.ts            # Redux slice
│   └── vote-saga.ts             # Side effects
└── types.ts                     # IVote, IVoteResult, etc.
```

**Chức năng chính:**
- Hiển thị poll question + options
- Vote cho một option
- Nhận real-time updates qua SSE
- Vẽ biểu đồ kết quả động

#### Dashboard Feature (`features/dashboard/`)

**Chức năng chính:**
- Hiển thị tổng số poll đã tạo
- Hiển thị tổng số vote nhận được
- Danh sách poll và statistics

### 2. Backend Controllers

#### AuthController

```javascript
// POST /auth/register
exports.register = async (req, res) => {
  // Validate email & password
  // Hash password với bcrypt
  // Lưu User vào database
  // Trả về JWT token
}

// POST /auth/login
exports.login = async (req, res) => {
  // Tìm user theo email
  // So sánh password
  // Tạo JWT token
  // Trả về token
}
```

#### PollController

```javascript
// POST /polls/create
exports.createPoll = async (req, res) => {
  // Xác thực JWT
  // Validate title & options
  // Tạo Poll document
  // Tạo Option documents
  // Trả về poll object
}

// GET /polls/:id
exports.getPoll = async (req, res) => {
  // Lấy poll từ database
  // Populate options
  // Trả về poll data
}

// GET /polls/user/:userId
exports.getUserPolls = async (req, res) => {
  // Lấy tất cả poll của user
  // Trả về danh sách polls
}

// DELETE /polls/:id
exports.deletePoll = async (req, res) => {
  // Xác thực JWT
  // Kiểm tra owner
  // Xóa poll
  // Trả về success
}
```

#### VoteController

```javascript
// POST /votes/submit
exports.submitVote = async (req, res) => {
  // Lấy poll_id, option_id, voter_fingerprint
  // Kiểm tra voter_fingerprint (đã vote chưa?)
  // Lưu Vote document
  // Cập nhật vote_count
  // Gửi SSE event tới clients
  // Trả về success
}

// GET /polls/:id/sse
exports.streamVoteUpdates = async (req, res) => {
  // Thiết lập SSE connection
  // Thêm client vào SSE manager
  // Gửi current vote counts
  // Lắng nghe SSE events
  // Gửi updates khi có vote mới
}
```

### 3. Backend Services

#### SSE Manager (`services/sse-manager.js`)

```javascript
class SSEManager {
  constructor() {
    this.connections = {}; // { pollId: [client1, client2, ...] }
  }

  addConnection(pollId, res) {
    // Lưu res object
    // Thiết lập SSE headers
  }

  removeConnection(pollId, res) {
    // Xóa connection khi client disconnect
  }

  broadcastUpdate(pollId, data) {
    // Gửi data tới tất cả clients của poll này
    // Định dạng: "data: {JSON}\n\n"
  }

  getActiveConnections(pollId) {
    // Trả về số lượng kết nối active
  }
}
```

---

## Giải Pháp Real-time

### 1. Phía Server: SSE Setup

```javascript
// backend/src/routes/vote-routes.js
router.get('/polls/:pollId/sse', (req, res) => {
  const pollId = req.params.pollId;

  // Thiết lập SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Thêm vào SSE manager
  sseManager.addConnection(pollId, res);

  // Gửi initial data
  const poll = await getPoll(pollId);
  res.write(`data: ${JSON.stringify(poll)}\n\n`);

  // Cleanup khi client disconnect
  req.on('close', () => {
    sseManager.removeConnection(pollId, res);
  });
});
```

### 2. Phía Client: EventSource

```javascript
// frontend/features/vote/hooks/use-poll-sse.ts
export const usePollSSE = (pollId) => {
  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    // Tạo EventSource connection
    const eventSource = new EventSource(`/polls/${pollId}/sse`);

    // Lắng nghe events
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPollData(data); // Cập nhật state
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close(); // Cleanup
  }, [pollId]);

  return pollData;
};
```

### 3. Broadcast Update Khi Vote Mới

```javascript
// backend/src/controllers/vote-controller.js
exports.submitVote = async (req, res) => {
  const { pollId, optionId, fingerprint } = req.body;

  // Kiểm tra duplicate vote
  const existingVote = await Vote.findOne({
    poll_id: pollId,
    voter_fingerprint: fingerprint
  });

  if (existingVote) {
    return res.status(400).json({ error: 'Bạn đã vote rồi' });
  }

  // Lưu vote mới
  const vote = new Vote({
    poll_id: pollId,
    option_id: optionId,
    voter_fingerprint: fingerprint
  });
  await vote.save();

  // Cập nhật option vote_count
  await Option.findByIdAndUpdate(
    optionId,
    { $inc: { vote_count: 1 } }
  );

  // Broadcast tới tất cả clients
  const updatedPoll = await getPoll(pollId);
  sseManager.broadcastUpdate(pollId, updatedPoll);

  res.json({ success: true });
};
```

---

## Hệ Thống Giám Sát & Metrics

### 1. Chỉ Số Monitoring Chính

#### HTTP Metrics

```
# Tổng số HTTP requests
http_requests_total{method="POST",path="/votes/submit",status="200"}

# Response time (latency)
http_request_duration_seconds{method="GET",path="/polls/:id"}

# Status code distribution
http_requests_status_total{status="200"}
http_requests_status_total{status="400"}
http_requests_status_total{status="500"}
```

#### Real-time Metrics

```
# Số lượng SSE connections đang hoạt động
sse_active_connections{poll_id="..."}

# Tổng số vote
votes_total{poll_id="..."}

# Vote count per option
votes_per_option{poll_id="...",option_id="..."}
```

#### System Health

```
# Node.js metrics
nodejs_memory_usage_bytes{type="heapTotal"}
nodejs_memory_usage_bytes{type="heapUsed"}

# CPU usage
process_cpu_usage_percent

# Uptime
process_uptime_seconds
```

### 2. Cấu Hình Prometheus

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'openpoll-backend'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
```

### 3. Cấu Hình Grafana

#### Dashboard 1: Request Metrics

| Tiêu chí | Visualization |
|---------|--------------|
| Requests Per Second | Line Chart |
| Response Time Distribution | Histogram |
| Error Rate | Gauge |
| Status Code Breakdown | Pie Chart |

#### Dashboard 2: Real-time Polling

| Tiêu chí | Visualization |
|---------|--------------|
| Active SSE Connections | Gauge |
| Total Votes | Counter |
| Vote Distribution | Bar Chart |
| Vote Trend Over Time | Line Chart |

#### Dashboard 3: System Health

| Tiêu chí | Visualization |
|---------|--------------|
| Memory Usage | Gauge |
| CPU Usage | Line Chart |
| Process Uptime | Stat |
| Garbage Collection | Line Chart |

### 4. Implementation: prom-client

```javascript
// backend/src/middleware/metrics.js
const client = require('prom-client');

// Tạo metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'path', 'status']
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status']
});

const sseConnections = new client.Gauge({
  name: 'sse_active_connections',
  help: 'Active SSE connections',
  labelNames: ['poll_id']
});

const votesTotal = new client.Counter({
  name: 'votes_total',
  help: 'Total votes submitted',
  labelNames: ['poll_id', 'option_id']
});

// Middleware để record metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.labels(req.method, req.path, res.statusCode).observe(duration);
    httpRequestsTotal.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Endpoint cho Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

---

## Quy Trình Triển Khai

### 1. Chuẩn Bị Môi Trường

#### Yêu Cầu Hệ Thống

- Docker & Docker Compose
- Node.js 18+
- MongoDB 5+
- Prometheus
- Grafana

### 2. Docker Setup

#### Dockerfile - Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### Dockerfile - Frontend

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/openpoll
      - JWT_SECRET=your_secret_key
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    depends_on:
      - backend

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3002:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus

volumes:
  mongo_data:
```

### 3. Khởi Chạy Hệ Thống

```bash
# Clone repository
git clone <repo-url>
cd OpenPoll

# Build images
docker-compose build

# Chạy services
docker-compose up -d

# Kiểm tra status
docker-compose ps

# Xem logs
docker-compose logs -f backend
```

### 4. Truy Cập Ứng Dụng

| Dịch vụ | URL | Mô tả |
|--------|-----|-------|
| Frontend | http://localhost:3001 | Web application |
| Backend API | http://localhost:3000 | API server |
| Prometheus | http://localhost:9090 | Metrics collection |
| Grafana | http://localhost:3002 | Dashboard (admin/admin) |
| MongoDB | localhost:27017 | Database |

### 5. Load Testing (Optional)

Sử dụng k6 để tạo traffic giả lập:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 0 },
  ],
};

export default function() {
  // Simulate voting
  const res = http.post('http://localhost:3000/votes/submit', {
    pollId: 'poll-123',
    optionId: 'option-1',
    fingerprint: __VU,
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
```

Chạy:
```bash
k6 run load-test.js
```

---

## Kết Luận

### 1. Thành Tựu Chính

✅ **Kiến Trúc Hệ Thống:** Thành công xây dựng kiến trúc client-server hiện đại với separation of concerns rõ ràng

✅ **Real-time Communication:** Triển khai SSE thành công, cho phép updates thời gian thực mà không cần polling

✅ **Feature-Based Architecture:** Áp dụng kiến trúc feature-based cho frontend, dễ maintain và scale

✅ **Observability:** Tích hợp đầy đủ hệ thống monitoring với Prometheus & Grafana

✅ **Containerization:** Triển khai toàn bộ hệ thống bằng Docker & Docker Compose

✅ **Security:** Áp dụng JWT authentication, password hashing, device fingerprinting chống spam

### 2. Kiến Thức Đạt Được

Thông qua dự án này, chúng tôi đã:

- Hiểu sâu về **Event-Driven Architecture**
- Nắm vững **Server-Sent Events (SSE)** và real-time communication patterns
- Áp dụng **Redux Toolkit & Redux Saga** cho state management phức tạp
- Triển khai **Prometheus metrics** và **Grafana dashboards**
- Thực hành **Docker & Container Orchestration**
- Thiết kế **scalable database schema** trên MongoDB
- Xây dựng **robust authentication** với JWT

### 3. Các Tính Năng Khả Thi Mở Rộng

Trong tương lai, dự án có thể mở rộng với:

- 🔄 **WebSocket Support:** Để hỗ trợ 2-way communication (real-time chat, notifications)
- 📱 **Mobile App:** React Native app cho iOS/Android
- 🔐 **Advanced Analytics:** Phân tích chi tiết về voter behavior
- ☁️ **Cloud Deployment:** Deploy lên AWS, GCP, Azure
- 🌐 **Horizontal Scaling:** Load balancing với nginx, Kubernetes orchestration
- 💾 **Caching Layer:** Redis cache cho performance optimization
- 📧 **Email Notifications:** Thông báo cho poll owners khi có vote mới

### 4. Lessons Learned

1. **Real-time systems phức tạp:** Cần xử lý careful khi manage connections, error recovery, và reconnection logic
2. **Monitoring từ sớm:** Metrics nên được tích hợp từ đầu, không phải add after-the-fact
3. **Feature-based architecture:** Rất hữu ích cho large projects nhưng cần planning kỹ lưỡng
4. **Load testing quan trọng:** Giúp phát hiện bottleneck trước khi production

---

## Tài Liệu Tham Khảo

### Backend

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [prom-client GitHub](https://github.com/siimon/prom-client)

### Frontend

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Redux-Saga Documentation](https://redux-saga.js.org)

### Real-time

- [Server-Sent Events MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [HTML5 EventSource API](https://html.spec.whatwg.org/multipage/server-sent-events.html)

### Monitoring

- [Prometheus Documentation](https://prometheus.io/docs)
- [Grafana Documentation](https://grafana.com/docs/grafana)

### DevOps

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose)

---

**Ngày hoàn thành:** Tháng 4, 2026  
**Trạng thái:** ✅ Hoàn thành  
**Version:** 1.0
