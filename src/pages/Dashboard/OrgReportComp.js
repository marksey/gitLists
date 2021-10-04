import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Row, Col, Card, CardBody } from "reactstrap"
import { withRouter, Link } from "react-router-dom"


class OrgReportComp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

    const { orgInfo } = this.props

  }

  render() {

    const { orgInfo } = this.props

    return (
      <React.Fragment>
        <Card style={{"height" : "101px"}} className="overflow-hidden">
            <Row>
              <Col s="3" className="ml-3">
                <img width="100px" src={orgInfo.avatar_url} alt="" className="img-fluid" />
              </Col>
              <Col xs="8">
                <div className="text-primary p-3">
                  <h5 className="text-primary">{orgInfo.name}</h5>
                  <p style={
                      {overflow: "hidden",
                      display: "block",
                      width: "200px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"}
                    }
                      className="text-primary">
                    {orgInfo.description}
                  </p>
                  <p className="text-primary">
                    {orgInfo.location ? <i className="bx bx-map"></i> : null}
                    {orgInfo.location}
                  </p>
                </div>
              </Col>
            </Row>
        </Card>
      </React.Fragment>
    )
  }
}

OrgReportComp.propTypes = {
  orgInfo: PropTypes.object,
}

function mapStateToProps(state) {
    const props = { orgInfo: state.repo.orgInfo };
    return props;
  }


export default connect(mapStateToProps)(withRouter(OrgReportComp))
