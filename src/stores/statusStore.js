import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    fullScreenLoading: false,
    messages: [],
  }),
  actions: {
    pushMessage(data) {
      const { title, content, style = 'success' } = data;
      this.messages.push({ style, title, content });
    },
    fullScreenLoadingActive() {
      this.fullScreenLoading = true;
    },
    fullScreenLoadingDeactive() {
      this.fullScreenLoading = false;
    },
  },
});
