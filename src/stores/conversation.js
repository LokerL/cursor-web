import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useConversationStore = defineStore("conversation", {
  state: () => {
    return {
      conversationId: uuidv4(),
      conversations: [],
      body: {
        userRequest: {
          message: "",
          currentRootPath: "./tutor",
          currentFileName: "main.js",
          currentFileContents: "",
          precedingCode: [""],
          currentSelection: null,
          suffixCode: [],
          copilotCodeBlocks: [],
          customCodeBlocks: [],
          codeBlockIdentifiers: [],
          msgType: "freeform",
          maxOrigLine: null,
        },
        userMessages: [],
        botMessages: [],
        contextType: "copilot",
        rootPath: "./tutor",
      },
      requestConfig: {
        headers: {
          accept: "*/*",
          "accept-language": "zh-CN",
          "content-type": "application/json",
          "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
      },
      userConversationOptions: {
        otherCodeBlocks: [],
        codeSymbols: [],
        currentFile: "index.js",
        precedingCode: "",
        procedingCode: "",
        currentSelection: null,
        selection: [Object],
        msgType: "freeform",
      },
      botConversationOptions: {
        type: "markdown",
        lastToken: "<|END_message|>",
        finished: true,
        currentFile: "index.js",
        interrupted: false,
      },
    };
  },
  getters: {},
  actions: {
    async pushConversation(conversation) {
      if (conversation.sender === "user") {
        conversation = Object.assign(
          conversation,
          this.userConversationOptions
        );
        this.conversations.push(conversation);
        this.body.userRequest.message = conversation.message;
        const res = await this.fetchConversation().then((res) => {
          this.pushConversation({
            sender: "bot",
            sentAt: new Date().getTime(),
            message: res,
            conversationId: this.conversationId,
          });
          this.body.userMessages.push(conversation);
        });
      } else {
        conversation = Object.assign(conversation, this.botConversationOptions);
        this.body.botMessages.push(conversation);
        this.conversations.push(conversation);
      }
    },
    async pushBotConversation(conversation) {},
    async fetchConversation() {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify(this.body),
        redirect: "follow",
      };
      return await fetch(import.meta.env.VITE_FETCH_URL, requestOptions)
        .then((response) => {
          return response.text();
        })
        .then((result) => {
          function parse(data) {
            let begin = false;
            let buffer = "";
            let arr = data.split("data: ");
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].includes("<|BEGIN_message|>")) {
                begin = true;
                continue;
              }
              if (arr[i].includes("<|END_message|>")) {
                break;
              }
              if (begin) {
                let p = arr[i].match(/"(.+)"/);
                if (p) {
                  buffer += JSON.parse(`"${p[1]}"`);
                }
              }
            }
            return buffer;
          }

          return parse(result);
        });
    },
  },
});
