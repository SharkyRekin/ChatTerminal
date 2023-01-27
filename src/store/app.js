// Utilities
import { defineStore } from 'pinia'
import { Shell } from "@/interface/shell";
import { History } from "@/interface/history";
import { Conversation } from "@/interface/conversation";
import * as bin from "@/store/commands/utils";

export const useAppStore = defineStore('app', {
  state: () => ({
    currentTheme: 'light',
    numberTabs: 0,
    tabs: null,
    shells: [],
  }),
  actions: {
    clearTabs() {
      this.tabs = null;
      this.numberTabs = 0;
      this.shells = [];
    },
    addTab() {
      this.numberTabs += 1;
      this.tabs = (this.numberTabs - 1);
      console.log(this.$state)
      if (localStorage.getItem('username') !== 'guest') {
        fetch(`/api/nwchat?user-id=${localStorage.getItem("id")}`)
          .then(res => res.json())
          .then(data => {
            this.shells.push(Shell(data.chatId));
          }).catch(err => console.log(err));
      } else {
        this.shells.push(Shell(this.numberTabs));
      }
      console.log(this.$state);
    },
    setTab(i) {
      this.numberTabs += 1;
      this.tabs = (this.numberTabs - 1);
      this.shells.push(Shell(i));
      console.log(this.$state);
    },
    removeTab(i) {
      this.tabs -= 1;
      this.numberTabs -= 1;
      if (localStorage.getItem('username') !== 'guest') {
        fetch(`/api/dchat?user-id=${localStorage.getItem('id')}&chat-id=${this.shells[i].id}`)
          .then(res => res.json())
          .then(data => {
            if (data.validation) {
              this.shells.splice(i, 1);
            }
          }).catch(err => console.log(err));
      } else {
        this.shells.splice(i, 1);
      }
      console.log(this.shells);
    },
    addChat(i, msg, out) {
      this.shells[i].conversation.push(Conversation(msg, out));
    },
    addHistory(i, output) {
      const history = History(this.shells[i].history.length, this.shells[i].command, output)
      this.shells[i].history.push(history)
    },
    clearHistory(i) {
      this.shells[i].history = []
    },
    setCommand(i, cmd) {
      this.shells[i].command = cmd
    },
    async execute(i) {
      const [cmd, args] = this.shells[i].command.split(' ')
      switch (cmd) {
        case 'clear':
          this.clearHistory(i);
          break
        case '':
          this.addHistory(i,'');
          break
        default:
          if (Object.keys(bin).indexOf(cmd) === -1) {
            this.addHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
          } else {
            try {
              const output = await bin[cmd](args);
              this.addHistory(i, output);
            } catch (error) {
              this.addHistory(i, error.message);
            }
          }
      }
    }
  }
})
