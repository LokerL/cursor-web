<template>
  <div>
    <button
      data-text="Awesome"
      class="button"
      @click="showDonate = !showDonate"
    >
      <span class="actual-text"
        >&nbsp;{{ showDonate ? "Close" : "Donate" }}&nbsp;</span
      >
      <span class="hover-text" aria-hidden="true"
        >&nbsp;{{ showDonate ? "Close" : "Donate" }}&nbsp;</span
      >
    </button>
    <span class="info" v-if="showDonate">再次点击关闭显示</span>
    <div class="donate" v-if="showDonate">
      <div class="card">
        <div class="content">
          <div class="front">
            <h3 class="title">请作者喝杯冰阔落🍻</h3>
            <h3 class="title-pay">
              使用微信支付 <span>鼠标悬停使用支付宝支付</span>
            </h3>
            <img class="subtitle-img" src="../assets/wx.jpg" alt="" srcset="" />
          </div>

          <div class="back">
            <h3 class="title">请作者喝杯咖啡☕️</h3>
            <h3 class="title-pay">
              使用支付宝支付 <span>移开鼠标使用微信支付</span>
            </h3>
            <img
              class="subtitle-img"
              src="../assets/zfb.jpg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const showDonate = ref(false);
</script>
<style scoped>
.info {
  font-size: 10px;
  color: rgba(30, 30, 30, 0.3);
  margin-left: 10px;
}
/* === removing default button style ===*/
.button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}

/* button styling */
.button {
  --border-right: 6px;
  --text-stroke-color: rgba(30, 30, 30, 0.6);
  --animation-color: #37ff8b;
  --fs-size: 2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);
}
/* this is the text, when you hover on button */
.hover-text {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}
/* hover */
.button:hover .hover-text {
  width: 100%;
  -webkit-filter: drop-shadow(0 0 23px var(--animation-color));
  filter: drop-shadow(0 0 23px var(--animation-color));
}
.donate {
  position: absolute;
  min-width: 400px;
  top: 60px;
  left: 5px;
}
.donate .des {
  margin-bottom: 10px;
}
h3 {
  margin: 1px 10px;
  font-size: 1em;
}

.btns {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* From uiverse.io by @JoseIsra */
.card {
  margin-top: 10px;
  height: 32vh;
  /* width: 38vw; */
  width: 380px;
  cursor: pointer;
}

.content {
  border-radius: 10px;
  text-align: center;
  position: relative;
  transition: all 2.25s;
  background-color: #00c250;
  padding: 5em;
  transform-style: preserve-3d;
  height: 100%;
  margin-left: 15px;
}

.card:hover .content {
  transform: rotateY(0.5turn);
}

.front,
.back {
  border-radius: 10px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.title {
  transform: translateZ(5rem);
  font-size: 1.7rem;
}
.subtitle-img {
  transform: translateZ(2rem);
  margin-top: 15px;
  border-radius: 10px;
  /* width: 28vw; */
  width: 320px;
  height: 38vh;
  max-height: 380px;
}
.subtitle {
  transform: translateZ(2rem);
}

.back {
  transform: rotateY(0.5turn);
  background-color: #1677ff;
}

.title-pay {
  transform: translateZ(3rem);
}
.title-pay span {
  transform: translateZ(3rem);
  font-size: 0.7em;
}
</style>
