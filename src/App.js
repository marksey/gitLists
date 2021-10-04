import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes
import {publicRoutes } from "./routes/"
import AppRoute from "./routes/route"

//layout
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                key={idx}
                component={route.component}
                isAuthProtected={false}
              />
            ))}      
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
