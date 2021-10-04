import React, { Component } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap"

import { getRepoList, getOrgMembers, getOrgInfo } from "store/repo/actions"

import moment from 'moment'

import { connect } from "react-redux"


// Pages Components
import OrgReportComp from "./OrgReportComp"
import RepoList from "../Repo/index"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {


    const {onGetOrgInfo, onGetRepoList, onGetOrgMembers } = this.props

    //passed org from home page
    var orgName = this.props.location.state.org
  
    //Get repo information using dispatch
    onGetRepoList(orgName); 
    onGetOrgMembers(orgName); 
    onGetOrgInfo(orgName);   

  }

  componentDidUpdate() {}

  render() {

    //Use props instead of state to pass data
    const {orgInfo, orgMembers} = this.props

    //If invalid org, return to home page
    if(orgInfo.message == "Not Found"){
      //Send user back home using history, with errorMsg
      this.props.history.push({ pathname: "/home", state: {errorMsg: true}})
      return (<React.Fragment><div></div></React.Fragment>)
    } else {
      return (
        <React.Fragment>
          <div className="page-content">
            <MetaTags>
              <title>Dashboard | Git Lists</title>
            </MetaTags>
            <Container fluid>
              <Row>
                <Col xl="4">
                  <OrgReportComp />
                </Col>
                <Col xl="8">
                  
                  <Row>
                    {/* Reports Render */}
                      <Col md="4" key={"_col_0"}>
                          <Card style={{"height" : "100px"}} className="mini-stats-wid"  >
                            <CardBody>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <p className="text-muted fw-medium">Public Repositories</p>
                                  <h4 className="mb-0">{orgInfo.public_repos}</h4>
                                </div>
                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                  <span className="avatar-title">
                                    <i className="bx bx bx-cctv font-size-24"/>
                                  </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>

                      <Col md="4" key={"_col_1"}>
                        {/*This is where reports menu is clickable*/}
                        
                          <Card style={{"height" : "100px"}} className="mini-stats-wid"  >
                            <CardBody>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <p className="text-muted fw-medium">People</p>
                                 <h5 className="mb-0">
                                   {orgMembers.length == 100 ? "100+" : orgMembers.length}
                                  </h5>
                                </div>
                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                  <span className="avatar-title">
                                    <i className="bx bx-user font-size-24"/>
                                  </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>

                      <Col md="4" key={"_col_2"}>
                        {/*This is where reports menu is clickable*/}
                        
                          <Card style={{"height" : "100px"}} className="mini-stats-wid"  >
                            <CardBody>
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <p className="text-muted fw-medium">Date Created</p>
                                 <h5 className="mb-0">{moment(orgInfo.created_at).format("MMM DD, YYYY")}</h5>
                                </div>
                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                  <span className="avatar-title">
                                    <i className="bx bx-calendar font-size-24"/>
                                  </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>          
                  </Row>
                </Col>
              </Row>
            
              <Row>
                <Col lg="12">
                  <RepoList/>
                </Col>
              </Row>
  
            </Container>
          </div>
        </React.Fragment >
      )
    }

    
  }
}

Dashboard.propTypes = {
  orgInfo: PropTypes.object,
  repoList: PropTypes.array,
  orgMembers: PropTypes.array,
  error: PropTypes.object,
  onGetOrgInfo: PropTypes.func,
  onGetRepoList: PropTypes.func,
  onGetOrgMembers: PropTypes.func,
}

function mapStateToProps(state) { 

  
  const props = { 
                  error: state.repo.error,
                  repoList: state.repo.repoList, 
                  orgMembers: state.repo.orgMembers, 
                  orgInfo: state.repo.orgInfo,
                };

  return props;
}

const mapDispatchToProps = dispatch => ({
  onGetRepoList: orgName => dispatch(getRepoList(orgName)),
  onGetOrgMembers: orgName => dispatch(getOrgMembers(orgName)),
  onGetOrgInfo: (orgName) => dispatch(getOrgInfo(orgName)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard)

