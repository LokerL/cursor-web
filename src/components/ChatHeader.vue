<template>
  <div class="card-header">
    <div class="img-avatar"></div>
    <div class="text-chat">Chat</div>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.card-header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.card-header .img-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: #333;
}

.card-header .text-chat {
  color: black;
  margin: 0;
  font-size: 20px;
}
</style>
