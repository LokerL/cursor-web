<script setup>import { ref } from "vue";
import { useConversationStore } from "@/stores/conversation";
const store = useConversationStore();
const message = ref("");

const sendMsg = () => {
  // console.log(message.value);
  store.pushConversation({
    sender: "user",
    sentAt: new Date().getTime(),
    message: message.value,
    conversationId: store.conversationId,
  });
  message.value = "";
};

const handleAltEnter = () => {
  message.value += "\n";
};
</script>

<template>
  <div class="message-input">
    <textarea
      placeholder="Type your message here"
      class="message-send"
      v-model="message"
      @keydown.enter.prevent="sendMsg"
      @keydown.alt.enter.prevent="handleAltEnter"
    ></textarea>
    <button type="button" class="button-send" @click="sendMsg">Send</button>
  </div>
</template>

<style lang="css" scoped>
.message-input {
  padding: 5px;
  white-space: pre-wrap;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  height: 8vh;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.message-input .message-send {
  width: 90vw;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  resize: none;
}

.message-input .button-send {
  background-color: #333;
  color: #fff;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 13px;
  margin: 10px;
}

.message-input .button-send:hover {
  background-color: #999;
  color: #333;
}
</style>
