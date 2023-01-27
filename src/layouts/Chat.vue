<template>
  <v-col>
    <v-row v-for="(entry) in this.useApp.shells[this.terminal].conversation" class="pa-2">
      <v-col>
        <v-row>
          >>> {{ entry.message }}
        </v-row>
        <v-row>
          <pre> {{ entry.output }} </pre>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-for="(entry, index) in this.messages" :key="index" class="pa-2">
      <v-col>
        <v-row>
          >>> {{ entry.message }}
        </v-row>
        <v-row>
          {{ entry.response }}
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-text-field v-model="input" variant="plain" dense @keydown.enter="send" autofocus density="compact">
        <!-- <template v-slot:prepend> -->
          >>>
        <!-- </template> -->
      </v-text-field>
    </v-row>
  </v-col>
</template>

<script>
import { userAttributes } from '@/store/user';
import { userChat } from '@/store/user-chat';
import { useAppStore } from "@/store/app";

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      input: '',
      messages: [],
    }
  },
  methods: {
    send() {
      if (this.input !== 'exit') {
        fetch(`/api/nwmessage?message=${this.input}&user-id=${localStorage.getItem("id")}&chat-id=${this.nbChat}`,
          {method: 'GET'})
          .then(response => response.json())
          .then(data => {
            this.messages.push({response: data.response, message: this.input});
          }).catch(error => {
            console.log(error);
          this.messages.push({response: 'Rompish 😴', message: this.input});
        }).finally(() => this.input = '');
      } else {
        let res = "";
        Object.values(this.messages).forEach((data) => {
          this.useApp.addChat(this.terminal, data.message, data.response);
        });
        Object.values(this.useApp.shells[this.terminal].conversation).forEach((data) => {
          res += `>>> ${data.message}\n${data.output}\n`;
        });
        this.useApp.shells[this.terminal].history[this.useApp.shells[this.terminal].history.length - 1].output = res;
        this.useApp.setCommand(this.terminal, 'exit');
      }
    }
  },
  props: {
    terminal: Number,
    nbChat: Number
  },
  setup() {
    const userAttr = userAttributes();
    const useApp = useAppStore();
    const userchat = userChat();
    return { userAttr, userchat, useApp }
  }
}
</script>

<style scoped>
.v-text-field >>> .v-field__input {
    min-height: 0px !important;
    padding-top: 0px !important;
    padding-left: 5px !important
}
</style>
