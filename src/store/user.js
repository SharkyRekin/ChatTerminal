import { defineStore } from "pinia";

export const userAttributes = defineStore('userAttr', {
    state: () => ({
        id : 0,
        username : 'guest'
    })
})