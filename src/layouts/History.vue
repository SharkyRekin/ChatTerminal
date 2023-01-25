<template>
  <v-row v-for="(entry, index) in this.useApp.shells[this.terminal].history" :key="index" class="pa-2">
    <v-col>
      <v-row>
        <PS /> {{ entry.command }}
      </v-row>
      <v-row>
        <pre> {{ entry.output }} </pre>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PS from "@/layouts/PS.vue";
import {useAppStore} from "@/store/app";

export default {
  name: "History",
  components: {PS},
  props: {
    terminal: Number
  },
  setup() {
    const useApp = useAppStore();
    return { useApp }
  }
}
</script>

<style scoped>

</style>
