<template>
  <v-row v-for="(entry, index) in this.useApp.shells[this.terminal].history" :key="index" class="pl-4 mt-0 mb-0">
    <v-col>
      <v-row>
        <PS :terminal="this.terminal+1" class="mr-1"/> {{ entry.command }}
      </v-row>
      <v-row class="pl-2">
        <div v-html="entry.output"></div>
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
