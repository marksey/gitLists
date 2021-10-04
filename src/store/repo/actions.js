import {
  GET_ORG_INFO,
  GET_ORG_INFO_SUCCESS,
  GET_ORG_INFO_FAIL,
  GET_REPO_LIST,
  GET_REPO_LIST_SUCCESS,
  GET_REPO_LIST_FAIL,
  GET_COMMIT_LIST,
  GET_COMMIT_LIST_SUCCESS,
  GET_COMMIT_LIST_FAIL,
  GET_ORG_MEMBERS,
  GET_ORG_MEMBERS_SUCCESS,
  GET_ORG_MEMBERS_FAIL,
} from "./actionTypes"

export const getRepoList = orgName => ({
  type: GET_REPO_LIST,
  payload: orgName,
})

export const getRepoListSuccess = repoList => ({
  type: GET_REPO_LIST_SUCCESS,
  payload: repoList,
})

export const getRepoListFail = error => ({
  type: GET_REPO_LIST_FAIL,
  payload: error,
})

export const getOrgInfo = orgName => ({
  type: GET_ORG_INFO,
  payload: orgName,
})

export const getOrgInfoSuccess = orgInfo => ({
  type: GET_ORG_INFO_SUCCESS,
  payload: orgInfo,
})

export const getOrgInfoFail = error => ({
  type: GET_ORG_INFO_FAIL,
  payload: error,
})

export const getOrgMembers = orgName => ({
  type: GET_ORG_MEMBERS,
  payload: orgName,
})

export const getOrgMembersSuccess = orgMembers => ({
  type: GET_ORG_MEMBERS_SUCCESS,
  payload: orgMembers,
})

export const getOrgMembersFail = error => ({
  type: GET_ORG_MEMBERS_FAIL,
  payload: error,
})

export const getCommitList = commitUrl => ({
  type: GET_COMMIT_LIST,
  payload: commitUrl,
})

export const getCommitListSuccess = commitsList => ({
  type: GET_COMMIT_LIST_SUCCESS,
  payload: commitsList,
})

export const getCommitListFail = error => ({
  type: GET_COMMIT_LIST_FAIL,
  payload: error,
})

