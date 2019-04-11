import { param2Obj } from 'utils';

const userMap = {
  doujiangdong: {
    role: ['doujiangdong'],
    token: 'doujiangdong'
  }
}

export default {
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};
