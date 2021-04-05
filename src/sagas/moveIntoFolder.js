import { takeLatest, put } from 'redux-saga/effects';
import { MOVE_INTO_FOLDER } from '../reducers/tree';
import { getSetTree } from './getTree';

// import loading from '../utils/loading';

function* moveIntoFolder({ ids, folder }) {
  // const loadingMsg = 'Accepting Service Agreement';
  // loading.start(loadingMsg);
  try {
    const resp = yield fetch('/api/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // TODO: account for the basePath of current folder
      body: JSON.stringify({ ids, folder }),
    });
    if (resp.ok) {
      // TODO: trigger snackbar notification?
      yield getSetTree();
    }
  } catch (e) {
    console.log(e);
  } finally {
    // loading.end(loadingMsg);
  }
}

export default function* watch() {
  yield takeLatest(MOVE_INTO_FOLDER, moveIntoFolder);
}
