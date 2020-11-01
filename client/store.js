import { createStore } from 'redux';
import localStore from './services/localStorage';

const initialState = {
  loading: false,
  token: localStore.getItem('token'),
  currentFolder: [],
  files: [],
  used: 0,
  total: 1073741824,
};

export const actions = {
  setLoading(payload) {
    return { type: 'SET_LOADING', payload };
  },
  setUserInfo(payload) {
    return { type: 'SET_USER_INFO', payload };
  },
  setCurrentFolder(payload) {
    return { type: 'SET_CURRENT_FOLDER', payload };
  },
  setFiles(payload) {
    return { type: 'SET_FILES', payload };
  },
  logout() {
    return { type: 'LOGOUT' };
  },
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, loading: action.payload };
    }
    case 'SET_CURRENT_FOLDER': {
      return { ...state, currentFolder: action.payload };
    }
    case 'SET_FILES': {
      return { ...state, ...action.payload };
    }
    case 'SET_USER_INFO': {
      localStore.setItem('token', action.payload.token);
      return { ...state, ...action.payload };
    }
    case 'LOGOUT': {
      localStore.clear();
      return {
        loading: false,
        token: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(reducers);
