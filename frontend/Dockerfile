FROM node:20-alpine

WORKDIR /app

# Copy package.json và package-lock.json (nếu có) trước để tận dụng Docker cache
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng 3000 cho Next.js dev server
EXPOSE 3000

# Chạy ứng dụng ở chế độ dev
CMD ["npm", "run", "dev"]
