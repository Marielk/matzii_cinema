import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './mainStyle.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class mainComponent extends Component {
  constructor() {
    super();
    this.state = {
      show: this.show,
      data: [],
      amount: this.amount
    }
    this.show= false;
    this.selected = [];
    this.excedMaximum = false;
    this.amount = 0;
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
    this.maxOfRows();
    const btn = document.getElementById('payBtn');
    btn.setAttribute('disabled', true);
  }

  handleClick = id => {
    const index = this.selected.indexOf(id);
    if (index === -1) {
      document.getElementById(id).classList.add('buttonActive');
      this.selected.push(id);
      this.showSelection(id);
      this.amount = this.amount + 8;
      this.setState({ amount: this.amount });
    } else {
      this.deleteButtonOnClick(id, index);
      this.removeSelection(id);
      this.amount = this.amount - 8;
      this.setState({ amount: this.amount });
    }
    const btn = document.getElementById('payBtn');
    if(this.selected.length > 0) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', true);
    }
    this.maxOfTickets();
  }

  deleteButtonOnClick(id, index) {
    const button = document.getElementById(id);
    button.classList.remove('buttonActive');
    this.selected.splice(index, 1);
  }

  removeSelection(id) {
    const elem = document.getElementById(`${id}pink`);
    if (elem) {
      elem.remove();
    }
  }

  createBoard(seatings){
    let board = [];
    let boardChildrens = [];

    seatings.map((seating) => {
      if(seating.available === true) {
        boardChildrens.push(<button onClick={() => this.handleClick(seating.name)} className="btn btn-outline-danger glow-button commonBtn" 
        key={seating.name} id={seating.name}>{seating.name}</button>)
      } else if (seating.available === false) {
        boardChildrens.push(<button className="btn btn-primary commonBtn" 
        disabled={true}  key={seating.name} id={seating.name}>{seating.name}</button>)
      }
    });

    board.push(
      <div id="seatingContainer" className="seatingContainer mt-5 mb-5" key={1}>
        <div className="" key={1}>{boardChildrens}</div>  
      </div>
    )
    return board;
  }

  showSelection(id) {
    let elem = document.createElement('div');
    elem.className = 'selectedSeating text-light selected';
    elem.innerHTML = id; 
    elem.id = `${id}pink`;
    let crossbtn = document.createElement('button');
    crossbtn.className = 'btn btn-outline-light border-0 p-0 crossBtn';
    crossbtn.innerText = 'x';
    crossbtn.addEventListener('click', () => {
      this.handleClick(id);
    });
    elem.appendChild(crossbtn);
    const width = document.body.clientWidth;
    const index = this.selected.indexOf(id);
    if (width < 700) {
      this.showSelectionSmallDevice(index, elem);
    } else {
      this.showSelectionLg(index, elem);
    }
  }

  showSelectionLg(index, elem) {
    if(index <= 3) {
      let parentDiv = document.getElementById('1ticketRow'); 
      parentDiv.appendChild(elem);
    } else if (index <= 7 && index > 3) {
      let parentDiv = document.getElementById('2ticketRow'); 
      parentDiv.appendChild(elem);
    } else {
      let parentDiv = document.getElementById('3ticketRow'); 
      parentDiv.appendChild(elem);
    }
  }

  showSelectionSmallDevice(index, elem){
    if(index <= 1) {
      let parentDiv = document.getElementById('1ticketRow'); 
      parentDiv.appendChild(elem);
    } else if (index <= 3 && index > 1) {
      let parentDiv = document.getElementById('2ticketRow'); 
      parentDiv.appendChild(elem);
    } else if (index <= 5 && index > 3){
      let parentDiv = document.getElementById('3ticketRow'); 
      parentDiv.appendChild(elem);
    } else if (index <= 8 && index > 5){
      let parentDiv = document.getElementById('4ticketRow'); 
      parentDiv.appendChild(elem);
    }
  }

  maxOfRows() {
    const maxRows = 4;
    let i = 0;
    const parentDiv = document.getElementById('selectedSeatingContainer'); 
    do {
      i = i + 1;
      parentDiv.insertAdjacentHTML('beforeend', `<div id='${i}ticketRow'>
      </div>`);
      let row = document.getElementById(`${i}ticketRow`);
      row.style.display = 'flex';
    } while (i < maxRows);
  }

  maxOfTickets() {
    const maxTickets = 8;
    const parent = document.getElementById('seatingContainer');
    const btns = parent.children[0].children;
    if (this.selected.length >= maxTickets) {
      for (let btn of btns) {
        btn.setAttribute('disabled', true);
      }
      this.excedMaximum = true;
    } else if(this.excedMaximum === true && this.selected.length <= maxTickets) {
      for (let btn of btns) {
        const clase = btn.className;
        const disabled = btn.hasAttribute('disabled'); 
        const available = 'btn btn-outline-danger glow-button commonBtn';
        const active = 'btn btn-outline-danger glow-button commonBtn buttonActive';
        if (clase === available && disabled === true) {
          btn.removeAttribute('disabled');
        } else if(clase === active && disabled === true){
          btn.removeAttribute('disabled');
        }
      }
      this.excedMaximum = false;
    }
  }

  render() {
    return (
      <div className="container pt-5 pb-5 mx-auto w-75">
        <h3 className="text-light mb-4 mt-3">Choose a place</h3>
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
        <hr></hr>
        <div className="d-flex justify-content-between">
          <p className="text-light">Price:  ${this.amount}USD</p>
          <p className="text-light text-right font-weight-light">Max. of ticket per buy: 8</p>
        </div>
        <div className="row lowBlock">
          <div className="col-6" id="selectedSeatingContainer">
          </div>
          <div className="col-6 justify-content-end d-flex">
            <button type="button" className="payment_button" id="payBtn" onClick={() => this.handleShow()}>Buy tickets
              <FontAwesomeIcon className="ml-1" icon={ faShoppingCart }/>
            </button>
          </div>
        </div>
        <Modal show={this.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Challenge completed!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src="./Escena_test2_1.gif" className="w-100"></img>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleClose()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default mainComponent;