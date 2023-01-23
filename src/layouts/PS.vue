<template>
  <div>
    <span style="color:#39ff13">
      {{ this.username }}@gpt
    </span>
    <span >
      :
    </span>
    <span style="color:blue">
      $~
    </span>
  </div>
</template>

<script>

import { userAttributes } from '@/store/user';

export default {
  name: "PS",
  data() {
    return {
      username : this.userAttr.username
    }
  },
  setup() {
    const userAttr = userAttributes();
    return { userAttr }
  }
}
</script>

<style scoped>
</style>
