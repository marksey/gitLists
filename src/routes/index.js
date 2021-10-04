
//Home
import Home from "../pages/Home/index"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Eventually, build out privateRoutes in addition to publicRoutes
const publicRoutes = [

  //Home
  { path: "/home", component: Home},
  { path: "/dashboard", component: Dashboard },

]

export { publicRoutes }
