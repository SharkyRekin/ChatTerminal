<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
            <v-col cols="12" sm="8" md="4" lg="4">
                <v-card elevation="0">
                    <div class="text-center">
                        <h1 class="mb-2">Register</h1>
                    </div>
                    <v-img src="@/assets/web-security.svg" alt="login" contain height="200"></v-img>
                    <v-card-text>
                        <v-form lazy-validation @submit.prevent="submitForm">
                            <v-text-field label="Enter your name" name="name" v-model="username" prepend-inner-icon="mdi-account"
                                type="text" class="rounded-0" outlined></v-text-field>
                            <v-text-field label="Enter your password" name="password" v-model="password" prepend-inner-icon="mdi-lock"
                                type="password" class="rounded-0" outlined></v-text-field>
                            <v-btn class="rounded-0 text-white" color="#000000" type="submit" x-large block dark>Register</v-btn>
                            <v-card-actions class="text--secondary">
                                <v-spacer></v-spacer>
                                Already have an account? <router-link to="/login" class="pl-2">Sign In</router-link>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="ml-6 mr-6 text-center">
                      <p>By continuing, you agree to IDA Policy and Terms of Use</p>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            fetch("/api/register?username=" + this.username + "&password=" + this.password,
                { method: "GET" })
                .then(response => response.json())
                .then(data => {
                    if (data.validation == true){
                      this.$router.push("/login")
                    }
                })
        }
    }
}
</script>
