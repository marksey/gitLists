import { all, fork } from "redux-saga/effects"

//public

import repoSaga from "./repo/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(repoSaga),

  ])
}
