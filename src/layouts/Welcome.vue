<template>
  <v-col>
    <v-row>
      <pre>
        {{this.banner}}
      </pre>
    </v-row>
    <v-row>
      Welcome to Chat Terminal
    </v-row>
    <v-row>
      <p>
        It is a web-based terminal emulator that allows you to run various commands with
        an integrated IA Chat bot.<br>
        You can type "help" to get a list of available commands.<br>
        To create your first chat, use the <v-btn icon="mdi-plus" size="13" color="black" class="ma-0 pa-0"></v-btn> button at the top right corner</p>
      <pre>

      </pre>
    </v-row>
  </v-col>
</template>

<script>
import banner from "@/store/commands/banner.json";
export default {
  name: "Welcome",
  data() {
    return {
      banner: banner[Math.floor(Math.random() * banner.length)]
    }
  }
}
</script>

<style scoped>

</style>
