<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="slide-right">
        <component :is="Component"/>
      </transition>
    </router-view>
  </v-app>
</template>

<script>
  import {useAppStore} from "@/store/app";

  export default {
    name: "App",
    data() {
      return {}
    },
    mounted() {
      if (localStorage.getItem('username') == null) {
        localStorage.setItem('username', 'guest');
        localStorage.setItem('id', '0');
      } else if (localStorage.getItem('username') !== 'guest') {
        fetch("/api/current_user", { method: "GET" })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.useApp.clearTabs();
            Object.values(data.chats).forEach((value) => {
              this.useApp.setTab(value.id);
              Object.values(value.messages).forEach((elt) => {
                this.useApp.addChat(this.useApp.numberTabs-1, elt.msg, elt.output);
              });
            });
          });
      }
      console.log(localStorage.getItem('username'));
    },
    setup() {
      const useApp = useAppStore();
      return { useApp };
    },
    watch: {},
    methods: {}
  }
</script>
