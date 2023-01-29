<template>
  <v-col>
    <v-row v-for="(entry, index) in this.useApp.shells[this.terminal].conversation" :key="index">
      <v-col>
        <v-row>
          >>>{{ entry.message }}
        </v-row>
        <v-row class="pl-2">
          <div v-html="entry.output"></div>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-text-field v-model="input" :readonly="isWait" autofocus dense density="compact" variant="plain"
                    @keydown.enter="send">
        >>>
      </v-text-field>
    </v-row>
  </v-col>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      input: '',
      isWait: false
    }
  },
  methods: {
    send() {
      if (this.isWait) return
      if (this.input !== 'exit') {
        this.isWait = true;
        fetch(`/api/nwmessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'message': this.input,
              'conversation': this.useApp.shells[this.terminal].conversation,
              'user-id': localStorage.getItem("id"),
              'chat-id': this.nbChat
            })
          })
          .then(response => response.json())
          .then(data => {
            this.useApp.addChat(this.terminal, this.input, data.response);
          }).catch(error => {
          console.log(error);
          this.useApp.addChat(this.terminal, this.input, 'Rompish 😴');
        }).finally(() => {
          this.input = ''
          this.isWait = false;
        });
      } else {
        let res = "";
        Object.values(this.useApp.shells[this.terminal].conversation).forEach((data) => {
          res += `<v-row>>>>${data.message}</v-row></br>
                  <v-row class="pl-2">${data.output}</v-row></br>`;
        });
        this.useApp.shells[this.terminal].history[this.useApp.shells[this.terminal].history.length - 1].output = res;
        this.useApp.setCommand(this.terminal, 'exit');
      }
    },
  },
  props: {
    terminal: Number,
    nbChat: Number
  },
  setup() {
    const useApp = useAppStore();
    return {useApp}
  }
}
</script>

<style scoped>
.v-text-field:deep(.v-field__input) {
  min-height: 0 !important;
  padding-top: 0 !important;
  padding-left: 4px !important
}
</style>
