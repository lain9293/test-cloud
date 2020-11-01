const localStore = {
  getItem: (key) => window.localStorage.getItem(key),

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);
  },

  clear: () => {
    window.localStorage.clear();
  },
};

export default localStore;
