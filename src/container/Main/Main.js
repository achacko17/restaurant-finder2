import React, {Component} from 'react';
//no component
import {Container, Row, Col, Button, Input} from 'reactstrap';
import { Spinner, Card, CardText, CardBody} from 'reactstrap';
//with component
import Dropdown from '../../components/Dropdown/Dropdown'
import NavBar from '../../components/Navbar/NavBar'
// import Card from '../../components/Card/Card'
import './Main.css'
import axios from 'axios'
import {connect} from 'react-redux'
 
class Main extends Component{

    state={
        data: [],
        result: [],
        isLoading: true
    }

     _isMounted = false;

    searchCategories = (event)  => {
        console.log(this.state.data)
    //   this.setState({text: event.target.value})
    //   console.log(this.state.text)
    const text = event.target.value.toLowerCase()
    const newResult = []
      for(let index = 0; index < this.state.data.length; index++){
          if(this.state.data[index].categories.name.toLowerCase().includes(text)){
              newResult.push(this.state.data[index])
          }
      }
      this.setState({result:newResult})
    }

    handleChange = (event)  => {
        this.setState({location: event.target.value, textInput: true})
      }

    componentDidMount(){
        this._isMounted = true;
        let config = {
            headers: {"user-key": "0bebf79759ac7e47316ab07b4578eb33"} 
        }
        axios.get( 'https://developers.zomato.com/api/v2.1/categories', config, {} )
            .then( response => {
                if(this._isMounted){
                    this.setState({ data: response.data.categories, result: response.data.categories, isLoading: false})
                    console.log(response.data)
                }
                
            } )
            .catch(error => {
                console.log(error);
            });

        if(this.props.fullName===""){
            this.props.history.push("/")
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    renderCategoriesonCard(){
        return this.state.result.map(category => {
            return (
                <Card key={category.categories.name}>
                    <CardBody>
                        <CardText>{category.categories.name}</CardText>
                    </CardBody>
                </Card>
                // console.log(category.categories.name)
            )
        })
    }

    callAxios = () => {
        let config = {}
        if(this.state.currentLoc){
            config = {
                        headers: {"user-key": "0bebf79759ac7e47316ab07b4578eb33"},
                        params: {lat: this.state.latitude, lon: this.state.longitude}
                    }
        }
        else if(this.state.textInput){
            config = {
                headers: {"user-key": "0bebf79759ac7e47316ab07b4578eb33"},
                params: { query: this.state.location}
            }
        }
        else{
            config = {
                headers: {"user-key": "0bebf79759ac7e47316ab07b4578eb33"},
            }
        }
        
        axios.get( 'https://developers.zomato.com/api/v2.1/locations', config)
        .then( response => {
            console.log(response.data)
            console.log(response.data.location_suggestions[0].entity_id)
        } )
        .catch(error => {
            console.log(error);
        });
    }


    getLocation = ()  => {
        const locationCoords = this.displayLocationInfo
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locationCoords);
          }
    }

    displayLocationInfo = (position)  => {
        this.setState({ latitude: position.coords.latitude, 
            longitude: position.coords.longitude, 
            currentLoc: true
        })

        console.log("Latitude: " + this.state.latitude + 
        "Longitude: " + this.state.longitude)
    }

 

    render() {
        let resp = this.state.isLoading ? <Spinner color="secondary" /> : this.renderCategoriesonCard()
        return(
            <>
            <div>
                {/* <NavBar/> */}
                <br></br>
            </div>
            <Container>
                <Row>
                    <Col md="8">
                        {resp}
                        {this.state.text}
                    </Col>
                    <Col md="4">
                        <Input placeholder="search categories" onChange={this.searchCategories}/>
                        <Input placehold='location' onChange={this.handleChange}/>
                        <Button color='primary' onClick={this.callAxios}>Search Location</Button>
                        <br></br>
                        <br></br>

                        <Button color='primary' onClick={this.getLocation}>Use Current Location</Button>
                         {/* <Dropdown/>
                        <Button color='primary' className='fourthButton'>Search</Button> */}

                    </Col>
                </Row>
            </Container>
            </> 
        );
    };
}


const mapStateToProps = state => {
    return {
        fullName: state.fullName
    }
};

export default connect (mapStateToProps)(Main);


