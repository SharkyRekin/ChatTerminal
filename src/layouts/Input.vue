<template>
  <v-text-field
    pa-0
    v-model="input"
    variant="plain"
    dense
    @keydown.enter="send"
    autofocus
    density="compact">
    <template v-slot:prepend>
      <PS />
    </template>
  </v-text-field>
</template>

<script>
import PS from "@/layouts/PS.vue";
import {useShell} from "@/store/shell";

export default {
  name: "TerminalInput",
  components: {PS},
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
