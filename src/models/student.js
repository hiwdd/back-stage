export default {
  namespace: 'student',
  state: {
    list: [],
    page: 1,
    limit: 5,
    total: 1,
    searchName: '',
  },
  effects: {
    *initData(action, { put, select }) {
      let page = yield select(state => state.student.page);
      let limit = yield select(state => state.student.limit);
      let searchName = yield select(state => state.student.searchName);
      page = action.page || page;
      limit = action.pageSize || limit;
      searchName = action.searchName || searchName;
      let response = yield fetch(
        `http://localhost:3000/student?_page=${page}&_limit=${limit}&name_like=${searchName}`,
      );
      let total = yield parseInt(response.headers.get('X-Total-Count'));
      let res = yield response.json();
      // console.log(res, total);
      yield put({ type: 'setList', list: res, page, limit, total });
    },
    *delData(action, { put }) {
      yield fetch(`http://localhost:3000/student/${action.id}`, {
        method: 'DELETE',
      });
      yield put({ type: 'initData' });
    },
    *ediData(action, { put }) {
      // console.log(action.id);
      let content = {
        name: action.nameVal,
        age: action.ageVal,
        sex: action.sexVal,
      };
      let response = yield fetch(`http://localhost:3000/student/${action.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      let res = yield response.json();
      console.log(res);
      yield put({ type: 'initData' });
    },
  },
  reducers: {
    setList: (state, action) => {
      return Object.assign({}, state, {
        list: action.list,
        page: action.page,
        limit: action.limit,
        total: action.total,
      });
    },
  },
};
