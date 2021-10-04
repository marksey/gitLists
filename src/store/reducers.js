import { combineReducers } from "redux"

//repo
import repo from "./repo/reducer"


const rootReducer = combineReducers({
  // public
  repo,
})

export default rootReducer
