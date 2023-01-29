<template>
  <DefaultBar />
  <v-main class="terminal">
    <v-window v-model="this.useApp.tabs" class="pa-2 ma-2 input">
      <v-window-item v-for="n in this.useApp.numberTabs" :key="n" :value="n" :transition="false">
        <History :terminal="n-1" />
        <TerminalInput :terminal="n-1" />
      </v-window-item>
      <v-window-item fluid v-if="this.useApp.numberTabs < 1" :key="this.useApp.tabs">
        <Welcome />
      </v-window-item>
    </v-window>
  </v-main>
</template>

<script>
  import TerminalInput from "@/layouts/Input.vue";
  import History from "@/layouts/History.vue";
  import DefaultBar from '@/layouts/AppBar.vue'
  import {useAppStore} from "@/store/app";
  import Welcome from "@/layouts/Welcome.vue";

  export default {
    components: {Welcome, DefaultBar, History, TerminalInput},
    data() {
      return {}
    },
    setup() {
      const useApp = useAppStore();
      return { useApp }
    },
    methods: {}
  }
</script>

<style scoped>
  .terminal {
    background-color: #000;
    color: #fff;
    height: 100%;
    width: 100%;
  }

  .input {
    border: yellow 2px solid;
    border-radius: 12px;
    height: calc(100% - 15px);
  }
</style>
