Tất cả code frontend của dự án OpenPoll phải tuân thủ kiến trúc Feature-Based. Mỗi feature là một module độc lập nắm giữ toàn bộ logic nghiệp vụ của domain đó.1. Nguyên tắc cốt lõiDomain-Driven: Mọi thứ liên quan đến một nghiệp vụ (ví dụ: bình chọn, quản lý poll) phải nằm trong features/<feature-name>/.Thin Route Layer: Thư mục app/ chỉ dùng để định nghĩa route. KHÔNG viết logic, UI, hay gọi API trực tiếp trong app/. Chỉ import page component từ features/.Cross-feature communication: Các feature không import trực tiếp từ nhau (trừ types hoặc constants dùng chung). Sử dụng Redux Store để trao đổi dữ liệu giữa các feature.Naming Convention: Interface bắt đầu bằng chữ I (ví dụ: IPoll). File đặt tên dạng kebab-case.2. Cấu trúc thư mục Feature (Mẫu OpenPoll)Dựa trên yêu cầu dự án, đây là cấu trúc cho các feature như poll, vote, auth:features/<feature-name>/
├── 📁 components/          # UI đặc thù (Vd: poll-chart.tsx, vote-button.tsx)
├── 📁 pages/               # Các trang hoàn chỉnh (Vd: voting-page.tsx)
├── 📁 hooks/               # Hook riêng (Vd: use-poll-sse.ts)
│   └── index.ts            # Re-export hooks
├── 📁 services/            # Gọi API (Vd: poll-service.ts)
├── 📁 store/               # Redux (Slice + Saga)
│   ├── index.ts            # Re-export actions & reducer
│   ├── <feature>-slice.ts
│   └── <feature>-saga.ts
├── 📁 validations/         # Schema Zod/Yup cho Form (Vd: create-poll.schema.ts)
├── 📄 types.ts             # Interface (Vd: IPoll, IVote)
└── 📄 page.tsx             # Entry point (nếu feature chỉ có 1 trang)
3. Quy định cho từng lớp (Dành cho OpenPoll)3.1 Store (Redux Toolkit + Saga)Tuân thủ pattern: Trigger → Success → Failure.Ví dụ cho feature vote:TypeScript// features/vote/store/vote-slice.ts
// actions: submitVote (trigger), submitVoteSuccess, submitVoteFailure
// actions: updateRealtimeResults (cho SSE)
3.2 Services (API)Sử dụng instance publicApi hoặc authApi từ @/lib/axios. Export dưới dạng object literal.TypeScript// features/poll/services/poll-service.ts
const pollService = {
  getDetail: async (id: string): Promise<IPollResponse> => {
    const res = await publicApi.get(`/polls/${id}`);
    return res.data;
  },
};
3.3 Real-time (SSE Hooks)Các logic liên quan đến kết nối EventSource để nhận update kết quả vote phải nằm trong features/vote/hooks/.4. Phân chia Scope (Global vs Feature)Vị tríKhi nào sử dụngVí dụ trong OpenPollsrc/components/ui/UI nguyên tử, dùng mọi nơiButton, Input, Modal, Badgefeatures/vote/components/UI chỉ dùng khi votePollResultChart, OptionListsrc/store/Cấu hình rootroot-saga.ts, index.ts (combine)features/poll/store/Logic nghiệp vụ pollcreatePollSaga, pollSlicesrc/types/Type dùng toàn appIApiResponse, IBaseEntityfeatures/auth/types.tsType liên quan UserIUser, ILoginPayload5. Danh sách Feature dự kiến cho OpenPollauth: Đăng ký, đăng nhập cho Owner.poll: Tạo mới poll, danh sách poll, xóa/đóng poll.vote: Trang vote cho người dùng, biểu đồ kết quả, kết nối SSE.dashboard: Thống kê tổng quan cho người quản trị.home: Landing page giới thiệu dự án.