import { fork, all } from 'redux-saga/effects';

import getTree from './getTree';
import moveIntoFolder from './moveIntoFolder';

const sagas = [
  getTree,
  moveIntoFolder,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
