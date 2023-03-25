import { nextTick, ref } from "vue";

export function useScroll() {
  const scrollRef = ref(null);

  const scrollToBottom = async () => {
    await nextTick();
    if (scrollRef.value)
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
  };

  const scrollToTop = async () => {
    await nextTick();
    if (scrollRef.value) scrollRef.value.scrollTop = 0;
  };

  const scrollToBottomIfAtBottom = async () => {
    await nextTick();
    if (scrollRef.value) {
      const threshold = 50; // 阈值，表示滚动条到底部的距离阈值
      const distanceToBottom =
        scrollRef.value.scrollHeight -
        scrollRef.value.scrollTop -
        scrollRef.value.clientHeight;
      if (distanceToBottom <= threshold)
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    }
  };

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  };
}
