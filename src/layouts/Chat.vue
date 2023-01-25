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
import {useShell} from "@/store/shell";

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
        this.shell.history[this.shell.history.length - 1].output = 'Bye bye';
        this.shell.setCommand('exit');
      }
    }
  },
  setup() {
    const userAttr = userAttributes();
    const shell = useShell();
    const userchat = userChat();
    return { userAttr, userchat, shell }
  }
}
</script>

<style scoped>

</style>
