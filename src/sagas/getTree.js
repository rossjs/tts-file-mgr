import { takeLatest, put } from 'redux-saga/effects';
import { GET_TREE, setTree } from '../reducers/tree';

// import loading from '../utils/loading';

export function* getSetTree() {
  // const loadingMsg = 'Accepting Service Agreement';
  // loading.start(loadingMsg);
  try {
    console.log('request tree from', `/api/files${window.location.pathname}`);
    const resp = yield fetch(`/api/files${window.location.pathname}`);
    const tree = yield resp.json();
    yield put(setTree(tree));
  } catch (e) {
    console.error(e);
  } finally {
    // loading.end(loadingMsg);
  }
}

export default function* watch() {
  yield takeLatest(GET_TREE, getSetTree);
}
