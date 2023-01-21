<template>
  <v-system-bar window>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="n in length"
        :key="n"
        :value="n"
      >
        Item {{ n }}
      </v-tab>
    </v-tabs>
    <v-btn icon="mdi-plus" variant="text" class="ms-2" @click="length++" />
    <v-spacer></v-spacer>
    <span>Chat Terminal</span>
    <v-btn icon="mdi-account" variant="text" class="ms-2"></v-btn>
  </v-system-bar>
</template>

<script>

export default {
  data() {
    return {
      tab: null,
      length: 1
    }
  },
  watch: {
    length (val) {
      this.tab = val - 1
    },
  }
}
</script>
