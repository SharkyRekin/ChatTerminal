<template>
  <v-col>
    <v-row>
      <v-text-field pa-0 v-model="input" variant="plain" dense @keydown.enter="send" autofocus density="compact">
        <template v-slot:prepend>
          >>>
        </template>
      </v-text-field>
    </v-row>
    <v-row>
      <span v-if="this.output !== ''"> >>> {{ this.output }}</span>
    </v-row>
  </v-col>


</template>

<script>
import { userAttributes } from '@/store/user';
import { userChat } from '@/store/user-chat';

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      input: '',
      output: '',
      // messages: [],
    }
  },
  methods: {
    send() {
      // this.messages.push(this.input)
      fetch(`/api/nwmessage?message=${this.input}&user-id=${this.userAttr.id}&chat-id=${this.userchat.id}`,
        { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          this.output = data.response
        });
    }
  },
  setup() {
    const userAttr = userAttributes();
    const userchat = userChat();
    return { userAttr, userchat }
  }
}
</script>

<style scoped>

</style>
