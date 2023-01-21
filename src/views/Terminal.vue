<template>
  <div class="terminal">
    <div class="input">
      <v-text-field
        v-model="input"
        variant="plain"
        dense
        @keydown.enter="send"
      />

    </div>
  </div>
</template>

<script>
  export default {
    components: { },
    data() {
      return {
        input: ''
      }
    },
    methods: {
      send() {
        console.log(this.input)
        this.input = ''
      }
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
