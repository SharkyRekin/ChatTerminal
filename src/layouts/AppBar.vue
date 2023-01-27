<template>
  <v-system-bar window>
    <v-tabs v-model="this.useApp.tabs" hide-slider height="32">
      <v-tab v-for="(n) in this.useApp.numberTabs" :key="n" :value="n">
        Chat {{ n }}
        <v-icon class="ms-2" @click="this.useApp.removeTab(n-1)">mdi-close</v-icon>
      </v-tab>
    </v-tabs>
    <v-btn icon="mdi-plus" variant="text" size="32" @click="this.useApp.addTab()"/>
    <v-spacer></v-spacer>
    <span>Chat Terminal</span>
    <v-btn icon="mdi-account" variant="text" class="ms-2" to="/login"></v-btn>
    <v-btn icon="mdi-logout" variant="text" class="ms-2" @click="logOut"></v-btn>
  </v-system-bar>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {
  name: "DefaultBar",
  data() {
    return {}
  },
  setup() {
      const useApp = useAppStore();
      return { useApp }
  },
  watch: {},
  methods: {
    logOut(){
      fetch("/api/logout",
      {method: "GET"})
      .then(response => response.json())
      .then(data => {
        if (data.validation === true) {
          alert("logout performed");
          localStorage.removeItem('username');
          localStorage.removeItem('id');
          console.log(localStorage.getItem('username'));
          location.reload();
        } else {
          alert("you are already logout");
        }
      })
    }
  },
}
</script>
