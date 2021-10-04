import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_ORG_INFO,
  GET_REPO_LIST,
  GET_COMMIT_LIST,
  GET_ORG_MEMBERS,
} from "./actionTypes"

import {
  getOrgInfoSuccess,
  getOrgInfoFail,
  getRepoListSuccess,
  getRepoListFail,
  getCommitListSuccess,
  getCommitListFail,
  getOrgMembersSuccess,
  getOrgMembersFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getOrgInfo,
  getRepoList,
  getOrgMembers,
  getCommitList,
} from "../../helpers/api_helper"

function* fetchOrgInfo({ payload: orgName }) {
  try {
    const response = yield call(getOrgInfo, orgName)
    yield put(getOrgInfoSuccess(response))
  } catch (error) {
    yield put(getOrgInfoFail(error))
  }
}

function* fetchRepoList({ payload: orgName }) {
  try {
    const response = yield call(getRepoList, orgName)
    yield put(getRepoListSuccess(response))
  } catch (error) {
    yield put(getRepoListFail(error))
  }
}

function* fetchOrgMembers({ payload: orgName }) {
  try {
    const response = yield call(getOrgMembers, orgName)
    yield put(getOrgMembersSuccess(response))
  } catch (error) {
    yield put(getOrgMembersFail(error))
  }
}

function* fetchCommitList({ payload: commitsUrl }) {
  try {
    const response = yield call(getCommitList, commitsUrl)
    yield put(getCommitListSuccess(response))
  } catch (error) {
    yield put(getCommitListFail(error))
  }
}

function* repoSaga() {
  yield takeEvery(GET_COMMIT_LIST, fetchCommitList)
  yield takeEvery(GET_ORG_INFO, fetchOrgInfo)
  yield takeEvery(GET_REPO_LIST, fetchRepoList)
  yield takeEvery(GET_ORG_MEMBERS, fetchOrgMembers)
}

export default repoSaga
