import {
  GET_ORG_INFO_SUCCESS,
  GET_ORG_INFO_FAIL,
  GET_REPO_LIST_SUCCESS,
  GET_REPO_LIST_FAIL,
  GET_ORG_MEMBERS_SUCCESS,
  GET_ORG_MEMBERS_FAIL,
  GET_COMMIT_LIST_SUCCESS,
  GET_COMMIT_LIST_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  error: {},
  repoList: [],
  orgMembers: [],
  orgInfo: {},
  commitsList: [],
}

//This is where you set the state with data 
//after making the get requests for data

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_ORG_INFO_SUCCESS:
      return {
        ...state,
        orgInfo: action.payload,
      }

    case GET_ORG_INFO_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_REPO_LIST_SUCCESS:
      return {
        ...state,
        repoList: action.payload,
      }

    case GET_REPO_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORG_MEMBERS_SUCCESS:
      return {
        ...state,
        orgMembers: action.payload,
      }

    case GET_ORG_MEMBERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMMIT_LIST_SUCCESS:
      return {
        ...state,
        commitsList: action.payload,
      }

    case GET_COMMIT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
