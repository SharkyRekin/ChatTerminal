<template>
  <DefaultBar />
  <v-main>
    <v-window v-model="this.useApp.tabs" class="pa-2 terminal">
      <v-window-item v-for="n in this.useApp.numberTabs" :key="n" :value="n" :transition="false">
        <History :terminal="n-1" />
        <TerminalInput :terminal="n-1" />
      </v-window-item>
    </v-window>
  </v-main>
</template>

<script>
  import TerminalInput from "@/layouts/Input.vue";
  import History from "@/layouts/History.vue";
  import DefaultBar from '@/layouts/AppBar.vue'
  import {useAppStore} from "@/store/app";

  export default {
    components: {DefaultBar, History, TerminalInput},
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
    overflow: hidden;
    background-color: #000;
    color: #fff;
    height: 100%;
    width: 100%;
  }

  .input {
    overflow-y: auto;
    padding: 20px;
    height: 100%;
    width: 100%;
    outline: yellow 2px solid;
    outline-offset: -10px;
    border-radius: 12px;
  }
</style>
