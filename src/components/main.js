import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import './mainStyle.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class mainComponent extends Component {
  constructor() {
    super();
    this.state = {
      show: this.show
    }
    this.show= false;
    
  }
  // open and close modal
  handleClose = () => {
    this.show = false;
    this.setState({ show: this.show });
  } 
  handleShow = () =>{
    this.show = true;
    this.setState({ show: this.show });
  } 
  //bring the seating from json file
  UNSAFE_componentWillMount() {
  
  }

  componentDidMount() {
 
  }



  render() {
    return (
      <div className="container pt-5">
        <div className="screen mx-auto"></div>
        <div className="seatingContainer mt-5 mx-auto">
          <button type="button" className="btn btn-primary">A1</button>
          <button type="button" className="btn btn-outline-danger glow-button">A2</button>
        </div>
        <div className="row seatingInfo mx-auto mt-4 mb-4 p-3">
          <div className="col-6 align-content-around">
            <button type="button" disabled={true} className="btn btn-primary">A1</button>
            <p className="d-inline text-light pl-3">Booked</p>
          </div>
          <div className="col-6 align-content-around">
            <button type="button" disabled={true} className="btn btn-outline-danger">A2</button>
            <p className="d-inline text-light pl-3">Available</p>
          </div>
        </div>
        <div className="row mx-auto lowBlock">
          <div className="col-6">
            <div id="selectedSeatingContainer">
              <div className="selectedSeating text-light">A1
              <button className="btn btn-outline-light border-0 p-0 ml-3"> 
                <FontAwesomeIcon icon={ faTimes }/>
              </button>
              </div>  
            </div>
          </div>
          <div className="col-6">
            <button type="button" className="payment_button" onClick={() => this.handleShow()}>Buy tickets
              <FontAwesomeIcon className="ml-1" icon={ faShoppingCart }/>
            </button>
          </div>
        </div>
        <Modal show={this.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleClose()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default mainComponent;