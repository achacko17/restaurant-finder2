import React, {Component} from 'react';
import {Button, Input, Container, Row, Col} from 'reactstrap';
import NavBar from '../../components/Navbar/NavBar'
import axios from 'axios'
import './Home.css'
import {connect} from 'react-redux'
 
class Home extends Component{
    state ={location: "", 
    latitude: 0, 
    longitude:0,
    textInput: false,
    currentLoc: false
}

    nextPage = ()  => {
      this.props.history.push('/main')
    }

    handleChange = (event)  => {
      this.setState({location: event.target.value, textInput: true})
    }

   

    setName = (event) => {
        this.props.setFullName(event.target.value)
    }

    render = () => {
        return(
            <>
            <div>
            {/* <NavBar/> */}
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <h2>Welcome to the Restaurant Finder</h2>
                    </Col>
                    <Col md="12">
                        <Input placeholder='Enter your name' onChange={this.setName}/>
                        <Button color='primary' onClick={this.nextPage} >Find a Restaurant</Button>
                    </Col>
                </Row>
            </Container>
            
            
            {/* <Container>
                <Row>
                    <Col md="2">
                        <h2>Welcome to the Restaurant Finder</h2>
                    </Col>
                    <Col md="2">
                        <Input placehold='location' onChange={this.handleChange}/>
                        <Button color='primary' onClick={this.callAxios}>Search Location</Button>
                    </Col>
                    <Col md="4">
                        
                        <Button color='primary' onClick={this.getLocation}>Use Current Location</Button>
                    </Col>
                    <Col md="4">
                        <Button color='primary' onClick={this.nextPage} >Find a Restaurant</Button>
                    </Col>
                </Row>
            </Container> */}
            </>
        );
    };
}


const mapDispatchToProps = dispatch => {
    return{
 
        setFullName: (fullName) =>
          dispatch({type: 'setFullName', payload: {fullName:fullName}}),
    
    }
  }
  
  export default connect (null, mapDispatchToProps)(Home)
  