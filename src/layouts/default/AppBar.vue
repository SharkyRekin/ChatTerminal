<template>
  <v-system-bar window>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="(n) in length"
        :key="n"
        :value="n"
      >
        Item {{ n }}
        <v-btn v-if="this.length > 1" icon="mdi-close" variant="text" class="ms-2" @click="length--" />
      </v-tab>
    </v-tabs>
    <v-btn icon="mdi-plus" variant="text" class="ms-2" @click="length++"/>
    <v-spacer></v-spacer>
    <span>Chat Terminal</span>
    <v-btn icon="mdi-account" variant="text" class="ms-2" to="/login"></v-btn>
    <v-btn icon="mdi-logout" variant="text" class="ms-2" @click="logOut"></v-btn>
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
  },
  methods: {
    logOut(){
      fetch("/api/logout",
      {method: "GET"})
      .then(response => response.json())
      .then(data => {
        if (data.validation === true) {
          alert("logout performed");
          location.reload();
        } else {
          alert("you are already logout");
        }
      })
    }
  },
}
</script>
