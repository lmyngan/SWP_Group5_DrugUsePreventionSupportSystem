/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.3s ease-out', // Thêm animation slideUp vào Tailwind
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(10px)', // Bắt đầu từ vị trí thấp hơn 10px
            opacity: '0', // Bắt đầu từ trạng thái mờ
          },
          '100%': {
            transform: 'translateY(0)', // Di chuyển lên vị trí ban đầu
            opacity: '1', // Hiện hoàn toàn
          },
        },
      },
    },
  },
  plugins: [],
}

