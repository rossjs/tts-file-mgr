import { bindActionCreators } from 'redux';
import { call, take, select } from 'redux-saga/effects';

// function to replace normal workflow for mapDispatchToProps
export const createDispatchBindings = (actionCreators) => (dispatch) => bindActionCreators(actionCreators, dispatch);

// function to select data that may not be loaded into the redux store yet
export function* selectAsync(selector, SUCCESS_TYPE, field) {
  let data = yield select(selector);
  if (data) return data;

  const payload = yield take(SUCCESS_TYPE);
  data = yield select(selector);
  if (data) return data;

  return payload[field];
}

export function* takeOnce(pattern, saga) {
  let once = false;
  while (!once) {
    const action = yield take(pattern);
    once = true;
    yield call(saga, action);
  }
}
