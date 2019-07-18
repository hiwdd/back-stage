import { message } from 'antd';
export default {
  namespace: 'user',
  state: {
    username: '用户',
  },
  effects: {
    *login(action, { put }) {
      let response = yield fetch(' http://localhost:3000/user');
      let res = yield response.json();
      // console.log(res, action.values);
      for (let i = 0; i < res.length; i++) {
        if (
          res[i].username === action.values.username &&
          res[i].password === action.values.password
        ) {
          let username = res[i].username;
          yield put({ type: 'CheckTheUser', name: username });
          yield message.success('登录成功', 0.5);
          yield (window.location.href = '/');
          return;
        }
      }
      message.error('用户名或密码错误', 2);
    },
  },
  reducers: {
    CheckTheUser(state, action) {
      console.log(action.name, { ...state, ...{ username: action.name } });
      return { ...state, ...{ username: action.name } };
    },
  },
};
