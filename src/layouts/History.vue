<template>
  {{
    this.shell.history.map()
  }}
</template>

<script>
import {useShell} from "@/store/shell";

export default {
  name: "History",
  setup() {
    const shell = useShell();
    return { shell }
  }
}
</script>

<style scoped>

</style>
