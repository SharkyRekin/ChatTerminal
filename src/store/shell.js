import { defineStore } from 'pinia'
import { History } from "@/interface/history";
import * as bin from '@/store/commands/utils'

export const useShell = defineStore('shell', {
  state: () => ({
    history: [],
    command: '',
  }),
  actions: {
    addHistory(output) {
      const history = History(this.history.length, this.command, output)
      this.history.push(history)
    },
    clearHistory() {
      this.history = []
    },
    setCommand(cmd) {
      this.command = cmd
    },
    async execute() {
      const [cmd, args] = this.command.split(' ')
      switch (cmd) {
        case 'clear':
          this.clearHistory();
          break
        case '':
          this.addHistory('');
          break
        default:
          if (Object.keys(bin).indexOf(cmd) === -1) {
            this.addHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
          } else {
            try {
              const output = await bin[cmd](args);
              console.log(output);
              this.addHistory(output);
            } catch (error) {
              this.addHistory(error.message);
            }
          }
      }
    }
  }
})
