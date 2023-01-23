<template>
    <v-row v-for="(entry, index) in this.history" :key="index" class="pa-2">
      <PS />
      <span>{{ entry }}</span>
    </v-row>
</template>

<script>
import {useShell} from "@/store/shell";
import PS from "@/layouts/PS.vue";
import {storeToRefs} from "pinia";

export default {
  name: "History",
  components: {PS},
  setup() {
    const shell = useShell();
    const { history } = storeToRefs(shell);
    return { shell, history }
  }
}
</script>

<style scoped>

</style>
