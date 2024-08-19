import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // 将 '@' 设置为 /src 的别名
      components: '/src/components', // 将 'components' 设置为 /src/components 的别名
      views: '/src/views', // 将 'views' 设置为 /src/views 的别名
      assets: '/src/assets', // 将 'assets' 设置为 /src/assets 的别名
      utils: '/src/utils', // 将 'utils' 设置为 /src/utils 的别名
    },
  },
});
