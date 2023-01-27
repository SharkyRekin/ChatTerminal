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
      <v-text-field v-model="input" variant="plain" dense @keydown.enter="send" autofocus density="compact" :readonly="isWait">
          >>>
      </v-text-field>
    </v-row>
  </v-col>
</template>

<script>
import { useAppStore } from "@/store/app";

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      input: '',
      messages: [],
      isWait: false
    }
  },
  methods: {
    send() {
      if (this.isWait) return
      if (this.input !== 'exit') {
        this.isWait = true;
        fetch(`/api/nwmessage`,
          {method: 'POST',
            body: JSON.stringify({'message': this.formatMessage(),
              'user-id': localStorage.getItem("id"),
              'chat-id': this.nbChat})})
          .then(response => response.json())
          .then(data => {
            this.messages.push({response: data.response, message: this.input});
            this.useApp.addChat(this.terminal, this.input, data.response);
          }).catch(error => {
            console.log(error);
          this.messages.push({response: 'Rompish 😴', message: this.input});
          this.useApp.addChat(this.terminal, this.input, 'Rompish 😴');
        }).finally(() => {
          this.input = ''
          this.isWait = false;
        });
      } else {
        let res = "";
        Object.values(this.useApp.shells[this.terminal].conversation).forEach((data) => {
          res += `>>> ${data.message}\n${data.output}\n`;
        });
        this.useApp.shells[this.terminal].history[this.useApp.shells[this.terminal].history.length - 1].output = res;
        this.useApp.setCommand(this.terminal, 'exit');
      }
    },
    formatMessage() {
      let res = "";
      Object.values(this.useApp.shells[this.terminal].conversation).forEach((data) => {
        res += `Q: ${data.message}\nA: ${data.output}\n`;
      });
      res+= `Q: ${this.input}\nA: `;
      console.log(res)
      return res;
    }
  },
  props: {
    terminal: Number,
    nbChat: Number
  },
  setup() {
    const useApp = useAppStore();
    return { useApp }
  }
}
</script>

<style scoped>
.v-text-field:deep(.v-field__input) {
    min-height: 0 !important;
    padding-top: 0 !important;
    padding-left: 5px !important
}
</style>
