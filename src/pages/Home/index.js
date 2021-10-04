import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  UncontrolledAlert
} from "reactstrap"


import logo from "../../assets/images/logo-dark.png"

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            org: "",
            errorMsg: false 
        }
    }

    updateInputValue(e) {

        this.setState({
          org: e.target.value
        });
    }

    submitSearch(e){
        e.preventDefault();

        this.props.history.push({ //browserHistory.push should also work here
            pathname: "/dashboard",
            state: {org: this.state.org}
          });
    }

    componentDidMount() {

      //Clear error message
      this.setState({ errorMsg: false })
    
      //Check if error state was passed from dashboard
      try {
        if (this.props.location.state.errorMsg){
          this.setState({ errorMsg: true })
        }
      } catch(error){}   
    }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">

          <MetaTags>
            <title>Git Lists | Home Page</title>
          </MetaTags>

          <Container fluid={true}>
            
            <div className="my-5 pt-sm-5"> {/* Align vertically*/}
            <div className="d-flex justify-content-center"> {/* Align horizontally*/}
            
                <Row>
                <Col xl="12">

                    <div className="mb-5 text-center">
                        <img src={logo} alt="" height="30" />
                    </div>

                    <Card>
                    <CardBody>
                        <CardTitle className="h5">Repository Search
                        </CardTitle>
                        <p className="card-title-desc">Please enter an organization name below.</p>

                        {
                          this.state.errorMsg
                          ? <UncontrolledAlert color="danger" role="alert">Error. Please try a different organization.</UncontrolledAlert>
                          : null
                        }

                        <Form onSubmit={this.submitSearch.bind(this)}>
                        <div className="form-floating mb-3">
                            <Input onChange={this.updateInputValue.bind(this)} type="text" className="form-control" id="org" placeholder="Enter Name" />
                            <Label htmlFor="floatingnameInput">Name</Label>
                        </div>
                        
                        <div>
                            <Button type="submit" color="primary" className="w-md">Search</Button>
                        </div>
                        </Form>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Home
