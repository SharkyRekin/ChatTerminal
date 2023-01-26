<template>
  <v-row class="pa-2" v-if="this.useApp.shells[this.terminal].command !== 'chat'">
    <PS :terminal="this.terminal+1"/>
    <v-text-field
      class="pa-0"
      v-model="input"
      variant="plain"
      dense
      @keydown.enter="send"
      autofocus
      density="compact">
    </v-text-field>
  </v-row>
  <v-row class="pa-2" v-if="this.useApp.shells[this.terminal].command === 'chat'">
    <Chat :terminal="terminal" :nb-chat="this.useApp.shells[this.terminal].id"/>
  </v-row>
</template>

<script>
import PS from "@/layouts/PS.vue";
import Chat from "@/layouts/Chat.vue";
import {useAppStore} from "@/store/app";

export default {
  name: "TerminalInput",
  components: {Chat, PS},
  data() {
    return {
      input: ''
    }
  },
  props: {
    terminal: Number
  },
  methods: {
    send() {
      this.useApp.setCommand(this.terminal, this.input);
      this.useApp.execute(this.terminal);
      this.input = '';
    }
  },
  setup() {
    const useApp = useAppStore();
    return { useApp }
  },
}
</script>

<style scoped>

</style>
