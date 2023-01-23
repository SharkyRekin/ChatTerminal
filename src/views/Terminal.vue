<template>
  <div class="terminal">
    <div class="input">
      <History />
      <TerminalInput :tab="abc"/>
    </div>
  </div>
</template>

<script>

  import TerminalInput from "@/layouts/Input.vue";
  import History from "@/layouts/History.vue";

  export default {
    components: {History, TerminalInput},
    data() {
      return {
        abc: "abc"
      }
    },
    methods: {
    }
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
