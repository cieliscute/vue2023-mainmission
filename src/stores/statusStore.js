import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    messages: [],
  }),
  actions: {
    pushMessage(data) {
      const { title = '提示', content, style = 'success' } = data;
      this.messages.push({ title, style, content });
    },
    clearMessage() {
      this.messages.length = 0;
    },
  },
});
