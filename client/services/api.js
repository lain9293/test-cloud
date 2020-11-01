import { navigate } from 'hookrouter';
import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import { actions, store } from '../store';

const superagent = superagentPromise(_superagent, global.Promise);

const url = 'api';

const handleErrors = (err) => {
  if (err && err.response && err.response.status === 401) {
    store.dispatch(actions.logout());
    navigate('/');
  }
};

const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
  const state = store.getState();
  console.log(state);
  if (state.token) {
    req.set('authorization', `Bearer ${state.token}`);
  }
};

const setLoading = (value) => {
  store.dispatch(actions.setLoading(value));
};

const requests = {
  del: (route) => superagent
    .del(`${url}${route}`)
    .use(tokenPlugin)
    .use(() => setLoading(true))
    .end(handleErrors)
    .then(responseBody)
    .finally(() => setLoading(false)),
  get: (route) => superagent
    .get(`${url}${route}`)
    .use(tokenPlugin)
    .use(() => setLoading(true))
    .end(handleErrors)
    .then(responseBody)
    .finally(() => setLoading(false)),
  put: (route, body) => superagent
    .put(`${url}${route}`, body)
    .use(tokenPlugin)
    .use(() => setLoading(true))
    .end(handleErrors)
    .then(responseBody)
    .finally(() => setLoading(false)),
  post: (route, body) => superagent
    .post(`${url}${route}`, body)
    .use(tokenPlugin)
    .use(() => setLoading(true))
    .end(handleErrors)
    .then(responseBody)
    .finally(() => setLoading(false)),
};

const Auth = {
  login: ({ login, password }) => requests.post('/auth/login', { login, password }),
  register: ({ login, password, email }) => requests.post('/auth/signup', {
    login,
    password,
    email,
  }),
};

const Files = {
  upload: (files, folder) => requests.post(`/files/upload?folder=${folder}`, files),
  list: (folder) => requests.get(`/files?folder=${folder}`),
  deleteFile: (folder, file) => requests.del(`/files?folder=${folder}&file=${file}`),
  createFolder: (currentFolder, newFolder) => requests.post(`/files/create-folder?folder=${currentFolder}`, {
    newFolder,
  }),
};

export default { Auth, Files };
