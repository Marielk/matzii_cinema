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
      show: this.show,
      data: []
    }
    this.show= false;
    this.selected = [];
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


  UNSAFE_componentWillMount() {
  }
  
  //bring the seating from json file
  async componentDidMount() {
    try {
      const response = await fetch('./test-seating.json');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json.seatings });
    } catch (error) {
      console.log(error);
    }
 
  }

  handleClick = id => {
    if (this.selected.indexOf(id) === -1) {
      document.getElementById(id).classList.add('buttonActive');
      this.selected.push(id);
    } else {
      this.deleteButtonOnClick(id);
    }
  }

  deleteButtonOnClick(id) {
    document.getElementById(id).classList.remove('buttonActive');
    this.selected.filter((selected) => {
      if(selected !== id) {
        return selected;
      }
    });
  }


  createBoard(seatings){
    let board = [];
    let boardChildrens = [];

    seatings.map((seating) => {
      if(seating.available === true) {
        boardChildrens.push(<button onClick={() => this.handleClick(seating.name)} className="btn btn-outline-danger glow-button commonBtn" key={seating.name} id={seating.name}>{seating.name}</button>)
      } else if (seating.available === false) {
        boardChildrens.push(<button className="btn btn-primary commonBtn" disabled={true}  key={seating.name} id={seating.name}>{seating.name}</button>)
      }
    });

    board.push(
      <div className="seatingContainer mt-5 mb-5" key={1}>
        <div className="" key={1}>{boardChildrens}</div>  
      </div>
    )
    return board;
  }


  render() {
    return (
      <div className="container pt-5 mx-auto w-75">
        <div className="screen"></div>
        {this.state.data ? (
            this.createBoard(this.state.data)
          ) : (console.log('no hay nada aun')) }
        <div className="row seatingInfo mt-4 mb-4 p-3">
          <div className="col-6 align-content-around">
            <button type="button" disabled={true} className="btn btn-primary">A1</button>
            <p className="d-inline text-light pl-3">Booked</p>
          </div>
          <div className="col-6 align-content-around">
            <button type="button" disabled={true} className="btn btn-outline-danger">A2</button>
            <p className="d-inline text-light pl-3">Available</p>
          </div>
        </div>
        <div className="row lowBlock">
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