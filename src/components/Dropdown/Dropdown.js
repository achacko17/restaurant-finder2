import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Dropdown.css'

 
class dropdown extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }

      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    state ={}

    render() {
        return(
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>Some Action</DropdownItem>
              <DropdownItem disabled>Action (disabled)</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Foo Action</DropdownItem>
              <DropdownItem>Bar Action</DropdownItem>
              <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
        );
    };
}
export default dropdown;