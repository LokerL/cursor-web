<script setup>
import { ref, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useConversationStore } from "@/stores/conversation";
import { useScroll } from "@/hooks/useScroll";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

import "highlight.js/styles/ir-black.css";

import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import nginx from "highlight.js/lib/languages/nginx";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import xml from "highlight.js/lib/languages/xml";
import shell from "highlight.js/lib/languages/shell";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("python", python);
hljs.registerLanguage("shell", shell);

const { scrollRef, scrollToBottom } = useScroll();

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

const store = useConversationStore();
const { conversations } = storeToRefs(store);

store.$subscribe((mutation, state) => {
  scrollToBottom();
});

const compiledMarkdown = (msg) => {
  return marked.parse(msg);
};
</script>

<template>
  <div class="card-body">
    <div class="messages-container" id="scrollRef" ref="scrollRef">
      <template
        v-for="conversation in conversations"
        :key="conversation.sentAt"
      >
        <div
          :class="[
            'message-box',
            conversation.sender === 'user' ? 'left' : 'right',
          ]"
        >
          <!-- <p><pre class="mag-pre">{{conversation.message}}</pre></p> -->
          <div v-html="md.render(conversation.message)"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card-body {
  height: calc(100vh - 10vh - 61px);
  overflow-y: auto;
}

.messages-container {
  padding: 15px;
}

.message-box {
  padding: 1px 10px;
  margin-bottom: 5px;
  border-radius: 10px;
}

.message-box.left {
  background-color: #f1f1f1;
  color: black;
  font-size: 13px;
  left: 0;
}

.message-box.right {
  background-color: #333;
  color: #fff;
  font-size: 13px;
  right: 0;
}
.mag-pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
