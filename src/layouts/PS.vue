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

export default {
  name: "PS",
  data() {
    return {
      username : localStorage.getItem('username')
    }
  }
}
</script>

<style scoped>
</style>
