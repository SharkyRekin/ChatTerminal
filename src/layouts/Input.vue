<template>
  <v-row class="pa-2">
    <PS />
    <v-text-field
      v-if="this.shell.command !== 'chat'"
      class="pa-0"
      v-model="input"
      variant="plain"
      dense
      @keydown.enter="send"
      autofocus
      density="compact">
    </v-text-field>
    <Chat v-if="this.shell.command === 'chat'" />
  </v-row>
</template>

<script>
import PS from "@/layouts/PS.vue";
import {useShell} from "@/store/shell";
import Chat from "@/layouts/Chat.vue";

export default {
  name: "TerminalInput",
  components: {Chat, PS},
  data() {
    return {
      input: ''
    }
  },
  props: {
    tab: String
  },
  methods: {
    send() {
      this.shell.setCommand(this.input);
      this.shell.execute();
      this.input = '';
    }
  },
  setup() {
    const shell = useShell();
    return { shell }
  },
}
</script>

<style scoped>

</style>
