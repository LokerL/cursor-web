<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatBody from "@/components/ChatBody.vue";
import ChatFooter from "@/components/ChatFooter.vue";
</script>

<template>
  <div class="card-container">
    <ChatHeader />
    <ChatBody />
    <ChatFooter />
  </div>
</template>

<style lang="css" scoped>
.card-container {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
