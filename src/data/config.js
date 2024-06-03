import { defineStore } from "pinia";

export const useConfigStore = defineStore("configs", () => {
  const SUCCESS = 200;
  const FAILED = 400;
  const Exception = 500;
  return {
    SUCCESS,
    FAILED,
    Exception,
  };
});
