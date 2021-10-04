import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom"
import { Card, CardBody, Col, Row, Modal, Button, ModalHeader, ModalBody } from "reactstrap"
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"


import {
  getCommitList
} from "store/repo/actions"


import moment from 'moment'


//Formats repo creation date in MM/DD/YYYY format
function dateFormatter(cell, repo) { 
  return ( 
    <>
        
        {moment(repo.created_at).format("MM/DD/YYYY h:mm A")}
    </>
  ) 
}

//Formats commit date in MM/DD/YYY format
function dateFormatterModal(cell, commit) { 
  return ( 
      <>
        <p>
        <i style={{"verticalAlign" : "middle"}} className="bx bx-calendar fa-lg"></i>&nbsp;
        {moment(commit.commit.author.date).format("MM/DD/YYYY h:mm A")}
        </p>
      </>
      
  ) 
}

//Formats commit author nicely
function userNameFormatter(cell, commit) {
  try{ 
    return (
      <>
        <p>
          <i style={{"verticalAlign" : "middle"}} className="bx bx-user fa-lg"></i>&nbsp;
          {commit.author.login}
        </p>
      </>
    )
  } catch(e) { 
    return (
      <>
      <p>
        <i style={{"verticalAlign" : "middle"}} className="bx bx-error fa-lg"></i>&nbsp;
        User not found
      </p>
      </>
    )
  }
}

//Formats Repo language nicely
function languageFormatter(cell, repo){
  if (repo.language){
    return ( <span style={{fontSize: "95%"}} className="badge bg-warning">{repo.language}</span>)
  } else {
    return ( <span style={{fontSize: "95%"}} className="badge bg-danger">Not Listed</span>)
  }

}

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidOrg: false,
      repoList: [],
      commitsList: [],
      modal: false,
      commitsListColumns: [
        {
          text: "id",
          dataField: "id",
          hidden: true,
          formatter: (cellContent, commit) => (
            <>
              {commit.id}
            </>
          ),
        },
        {
          text: "Title",
          dataField: "title",
          headerStyle: { width: '50px' },
          formatter: (cellContent, commit) => (
            <>
              <p>
                  <i style={{"verticalAlign" : "middle"}} className="bx bx-message fa-lg"></i>&nbsp;
                  {commit.commit.message}
              </p>
            </>
          ),
        },
        {
          text: "Username",  
          dataField: "userName",
          headerStyle: { width: '230px' },
          formatter: userNameFormatter,
        },
        {
          text: "Hash",  
          dataField: "hash",
          headerStyle: { width: '300px' },
          formatter: (cellContent, commit) => (
            <>
              <p>
              <i style={{"verticalAlign" : "middle"}} className="bx bx-key fa-lg"></i>&nbsp;
              {commit.sha}
              </p>
            </>
          ),
        },
        {
          text: "Date Created",  
          dataField: "dateCreated",
          formatter: dateFormatterModal,
          headerStyle: { width: '200px' },
        },
      ],
      repoListColumns: [
        {
          text: "id",
          dataField: "id",
          hidden: true,
          sort: true,
          formatter: (cellContent, row) => (
            <>
              {row.id}
            </>
          ),
        },
        {
          dataField: "",
          text: "",
          formatter: (cellContent, repo) => (
            <>
              {
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle">
                    {repo.name.charAt(0)}
                  </span>
                </div>
             }
            </>
          ),
        },
        {
          text: "Repository Name (Limit 100)",
          dataField: "name",
          formatter: (cellContent, repo) => (
            <>
              <h5 className="font-size-14 mb-1">
                <Link to="#" className="text-dark">
                  {repo.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">{repo.description}</p>
            </>
          ),
        },
        {
          text: "Language",
          dataField: "language",
          formatter: languageFormatter
        },
        {
          text: "Star Count",
          dataField: "stargazers_count",
          headerStyle: { width: '100px' },
          formatter: (cellContent, repo) => (
            <>
                <i className="bx bx-star"></i>
                {repo.stargazers_count}
            </>
          )
        },
        {
          text: "Fork Count",  
          dataField: "forks_count",
          headerStyle: { width: '100px' },
          formatter: (cellContent, repo) => (
            <>
             <i className="bx bx-git-repo-forked"></i>
              {repo.forks_count}
            </>
          )
        },
        {
          text: "Date Created",
          dataField: "createdAt",
          headerStyle: { width: '180px' },
          formatter: dateFormatter,
        },
        {
            text: "",
            dataField: "viewCommit",
            headerStyle: { width: '130px' },
            isDummyField: true,
            editable: false,
            formatter: (cellContent, repo) => (
              <div className="d-flex gap-3">
              <Button
                type="button"
                color="primary"
                className="btn-sm btn-rounded"
                onClick={() => this.handleViewCommits(repo)}
              >
                View Commits
              </Button>
              </div>
            )
        }
      ]
    }
    this.handleViewCommits = this.handleViewCommits.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  

  //Called every time component mounts
  componentDidMount() {}

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }


  //Called every time component updates
  componentDidUpdate() {}


  handleViewCommits = arg => {

    const { orgInfo, onGetCommitList } = this.props

    const repo = arg

    const orgName = orgInfo.login

    this.setState({
      repoList: {
        id: repo.id,
        name: repo.name,
      },
    })

    const commitsUrl = "https://api.github.com/repos/" + orgName + "/" + repo.name + "/commits"

    onGetCommitList(commitsUrl)

    this.toggle()
  }


  /* Insert,Update Delete data */

  render() {

    const { SearchBar } = Search;

    const { repoList, commitsList } = this.props

    if(repoList.message == "Not Found"){
      this.props.history.push({ pathname: "/home", state: {errorMsg: true}})
      return (<React.Fragment><div></div></React.Fragment>)
    
    } else {

      //Check for invalid list!
      const pageOptions = {
        sizePerPage: repoList.length,
        totalSize: repoList.length, // replace later with size(repoList),
        custom: true,
      }

      const pageOptionsModal = {
        sizePerPage: repoList.length,
        totalSize: repoList.length, // Show no more than 20 commits
        custom: true,
      }

      const defaultSorted = [{
        dataField: 'stargazers_count', // if dataField is not match to any column you defined, it will be ignored.
        order: 'desc' // desc or asc
      }];

      const defaultSortedModal = [{
        dataField: 'createdAt', // if dataField is not match to any column you defined, it will be ignored.
        order: 'desc' // desc or asc
      }];


      return (
        <React.Fragment>
          
            <MetaTags>
              <title>Repo List | Git List</title>
            </MetaTags>
            <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>

                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField='id'
                        columns={this.state.repoListColumns}
                        data={repoList}
                      >
                        {
                          ({
                            paginationProps,
                            paginationTableProps
                          }) => (
                            <ToolkitProvider
                              keyField='id'
                              columns={this.state.repoListColumns}
                              data={repoList}
                              search
                            >
                              {
                                toolkitprops => (
                                  <React.Fragment>
                                    <Row className="mb-2">
                                      <Col sm="4">
                                        <div className="search-box ms-2 mb-2 d-inline-block">
                                          <div className="position-relative">
                                            <SearchBar {...toolkitprops.searchProps} />
                                            <i className="bx bx-search-alt search-icon" />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col sm="8">
                                        <div className="text-sm-end">
                                          <Link to="/home">
                                            <Button
                                              color="primary"
                                              className="font-16 btn-block btn btn-success"
                                            >
                                              <i className="bx bx-search me-1" />
                                              Search Organization
                                            </Button>
                                          </Link>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xl="12">
                                        <div className="table-responsive">
                                          <BootstrapTable
                                            {...toolkitprops.baseProps}
                                            {...paginationTableProps}
                                            
                                            defaultSorted={defaultSorted}
                                            classes={
                                              "table align-middle table-hover"
                                            }
                                            bordered={false}
                                            striped={false}
                                            responsive
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  
                                  </React.Fragment>
                                )}
                            </ToolkitProvider>
                          )}
                      </PaginationProvider>
                    </CardBody>
                  </Card>
                </Col>
              </Row>


                  {/* Modal of repo list here. Limit 20 */}
                  <Modal
                    size="xl"
                    scrollable={true}
                    isOpen={this.state.modal}
                    className="modal-fullscreen"
                  >
                    <ModalHeader toggle={this.toggle} tag="h4">
                      
                        <i style={{"verticalAlign" : "middle"}} className="bx bx-git-commit fa-lg"></i>
                        &nbsp;
                        Recent Commits for {this.state.repoList.name}
                    
                    </ModalHeader>
                    <ModalBody>
                      
                      <PaginationProvider
                        pagination={paginationFactory(pageOptionsModal)}
                        keyField='id'
                        columns={this.state.commitsListColumns}
                        data={commitsList}
                      >
                        {
                          ({
                            paginationProps,
                            paginationTableProps
                          }) => (
                            <ToolkitProvider
                              keyField='id'
                              columns={this.state.commitsListColumns}
                              data={commitsList}
                            >
                              {
                                toolkitprops => (
                                  <React.Fragment>
                                    
                                    <Row>
                                      <Col xl="12">
                                        <div className="table-responsive">
                                          <BootstrapTable
                                            {...toolkitprops.baseProps}
                                            {...paginationTableProps}
                                            keyField='hash'
                                            defaultSorted={defaultSortedModal}
                                            classes={
                                              "table align-middle table-hover"
                                            }
                                            bordered={false}
                                            striped={false}
                                            responsive
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </React.Fragment>
                                )}
                            </ToolkitProvider>
                          )}
                      </PaginationProvider>
                    </ModalBody>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={this.toggle}
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close Window
                        </button>
                      </div>
                  </Modal>

        </React.Fragment>
      )
      }
    }

}

RepoList.propTypes = {
  orgInfo: PropTypes.object,
  repoList: PropTypes.array,
  onGetCommitList: PropTypes.func,
}

function mapStateToProps(state) {

    const props = { 
                  orgInfo: state.repo.orgInfo,
                  repoList: state.repo.repoList, 
                  commitsList: state.repo.commitsList 
                };

    return props;
  }

const mapDispatchToProps = dispatch => ({
  onGetCommitList: commitsUrl => dispatch(getCommitList(commitsUrl))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RepoList))