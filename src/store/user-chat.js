import { defineStore } from "pinia";

export const userChat = defineStore('userChat', {
    state: () => ({
        id : 0,
        messages : []
    })
})
