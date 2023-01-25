// Utilities
import { defineStore } from 'pinia'
import { Shell } from "@/interface/shell";
import { History } from "@/interface/history";
import * as bin from "@/store/commands/utils";

export const useAppStore = defineStore('app', {
  state: () => ({
    currentTheme: 'light',
    numberTabs: 1,
    tabs: null,
    shells: [Shell(0)]
  }),
  actions: {
    resetTabs() {
      this.tabs = null;
      this.numberTabs = 1;
      this.shells = [Shell(0)];
    },
    addTab() {
      this.numberTabs += 1;
      this.tabs = (this.numberTabs - 1);
      this.shells.push(Shell(this.tabs));
      console.log(this.shells);
    },
    removeTab(i) {
      this.tabs -= 1;
      this.numberTabs -= 1;
      this.shells.splice(i, 1);
      console.log(this.shells);
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
