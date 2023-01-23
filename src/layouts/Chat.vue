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
      >>>
    </template>
  </v-text-field>
</template>

<script>

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      input: ''
    }
  },
  methods: {
    send() {
      fetch(`/api/nwmessage?message=${this.input}`,
        {method: 'GET'})
        .then(response => response.json())
        .then(data => {console.log(data)});
    }
  }
}
</script>

<style scoped>

</style>
