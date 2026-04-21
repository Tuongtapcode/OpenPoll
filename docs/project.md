1. Mục tiêu & Tính năng chính
Mục tiêu: Tạo nền tảng bình chọn thời gian thực và tạo "traffic" thực tế để thực hành giám sát hệ thống (Prometheus + Grafana).

Tính năng:

Tạo Poll (câu hỏi + nhiều lựa chọn).

Bình chọn không cần đăng nhập (Voter anonymous).

Cập nhật kết quả Real-time qua SSE (Server-Sent Events).

Dashboard quản lý cho chủ Poll.

Hỗ trợ Metrics endpoint /metrics cho Prometheus.

2. Kiến trúc & Công nghệ (Tech Stack)
Frontend: Next.js 14 (App Router), Tailwind CSS, Recharts (vẽ biểu đồ).

Backend: Node.js + Express (Xử lý API và SSE).

Database: MongoDB.

Real-time: SSE (Dễ triển khai hơn WebSocket, phù hợp đẩy dữ liệu 1 chiều).

Deployment: Docker + Docker Compose (Chạy trên VM2).

3. Cấu trúc Database (PostgreSQL)
Hệ thống cần 4 bảng chính:

Users: Lưu thông tin người tạo poll (Email, Pass hash).

Polls: Tiêu đề, loại poll, trạng thái, người sở hữu.

Options: Các lựa chọn cho từng poll.

Votes: Lưu kết quả bầu chọn, kèm voter_fingerprint để chặn spam vote.

4. Luồng xử lý dữ liệu (Workflow)
Tạo: Owner tạo Poll -> Lưu DB -> Nhận link chia sẻ.

Vote: Voter mở link -> Kết nối SSE -> Click Vote -> Gửi request về Backend.

Broadcast: Backend lưu Vote -> Gửi sự kiện SSE đến tất cả client đang mở trang đó -> Biểu đồ tự nhảy số.

Monitor: Prometheus quét /metrics mỗi 15s -> Đẩy dữ liệu lên Grafana Dashboard.

5. Danh sách các màn hình cần Code
Trang chủ: Giới thiệu và nút bắt đầu.

Login/Register: Dành cho người tạo poll.

Create Poll: Form nhập câu hỏi, các option động.

Voting Page: Màn hình cho người đi vote (hiển thị câu hỏi + biểu đồ real-time).

User Dashboard: Quản lý danh sách các poll đã tạo.

6. Các chỉ số Monitoring quan trọng (Prometheus)
Bạn cần cấu hình thư viện prom-client để theo dõi:

HTTP Request: Tổng số yêu cầu và thời gian phản hồi.

Active SSE: Số lượng người đang xem poll trực tiếp.

Vote Count: Tổng số lượt vote đang tăng lên.

Node.js Health: Mức tiêu thụ RAM/CPU của server.

Lưu ý: Để demo "ăn điểm", bạn nên chuẩn bị một script load test (như k6) để giả lập hàng trăm lượt vote cùng lúc, giúp biểu đồ trên Grafana biến động sinh động hơn khi trình bày.