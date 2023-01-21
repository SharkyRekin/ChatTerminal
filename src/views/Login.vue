<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="8" md="4" lg="4">         
          <v-card elevation="0">
            <div class="text-center">
              <h1 class="mb-2">Login</h1>
            </div>
            <v-img src="@/assets/web-security.svg" alt="login" contain height="200"></v-img>
            <v-card-text>
              <v-form lazy-validation @submit.prevent="submitForm">
                <v-text-field label="Enter your name" name="name" v-model="username" prepend-inner-icon="mdi-account"
                                type="text" class="rounded-0" outlined></v-text-field>
                <v-text-field label="Enter your password" name="password" v-model="password" prepend-inner-icon="mdi-lock" type="password" suffix="| Forgot?" class="rounded-0" outlined></v-text-field>
                <v-btn class="rounded-0" color="#000000" x-large type="submit" block dark>Login</v-btn>
                <v-card-actions class="text--secondary">
                  <v-spacer></v-spacer>
                  No account? <router-link to="/register" class="pl-2" style="color: #000000">Sign Up</router-link>
                </v-card-actions>
              </v-form>
            </v-card-text>
            <v-card-actions class="ml-6 mr-6 text-center">
              <p>By continuing, you agree to IDA <a href="#" class="pl-2" style="color: #000000">Policy</a> and <a href="#" class="pl-2" style="color: #000000">Terms of Use</a></p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import router from '@/router';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            fetch("/api/login?username=" + this.username + "&password=" + this.password,
                { method: "GET" })
                .then(response => response.json())
                .then(data => {
                    if (data.validation == true){
                        router.push("/")
                    }
                })
        }
    }
}
</script>