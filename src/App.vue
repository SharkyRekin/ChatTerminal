<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="slide-right">
        <component :is="Component"/>
      </transition>
    </router-view>
  </v-app>
</template>

<script setup>
  //
</script>
