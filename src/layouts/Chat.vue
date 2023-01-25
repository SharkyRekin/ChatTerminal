<template>
  <v-col>
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
      <v-text-field pa-0 v-model="input" variant="plain" dense @keydown.enter="send" autofocus density="compact">
        <template v-slot:prepend>
          >>>
        </template>
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
        fetch(`/api/nwmessage?message=${this.input}&user-id=${this.userAttr.id}&chat-id=${this.userchat.id}`,
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
          res += `>>> ${data.message} \n ${data.response}\n`;
        });
        this.useApp.shells[this.terminal].history[this.useApp.shells[this.terminal].history.length - 1].output = res;
        this.useApp.setCommand(this.terminal, 'exit');
      }
    }
  },
  props: {
    terminal: Number
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

</style>
