import React, { Component }  from 'react';
import './mainStyle.scss'
import SeatingComponent from './seatingComponent';
import PaySectionComponent from './paySection';

class mainComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selected: [],
      amount: this.amount
    }
    this.selected = [];
    this.amount = 0;
  }

  handleSelection = (selected) => {
    this.selected.push(selected)
    this.setState({selected: this.selected});
  }

  handleAmount = (amount) => {
    this.amount = amount;
    this.setState({ amount: this.amount });
  }

  handleDeleted = (id) => {
    const index = this.selected.indexOf(id);
    this.selected.splice(index, 1);
    this.handleAmount(this.amount - 8);
  }

  
  render() {
    return (
      <div className="container">
        <h3 className="title">Choose a place</h3>
        <div className="screen"></div>
          <SeatingComponent onSelection={this.handleSelection} onAmount={this.handleAmount} selected={this.selected}/>
        <div className="seatingInfo">
          <div className="col-6 align-around">
            <button type="button" disabled={true} className="booked commonBtn">A1</button>
            <p className="textStyles">Booked</p>
          </div>
          <div className="col-6 align-content-around">
            <button type="button" disabled={true} className="available  commonBtn glow-button">A2</button>
            <p className="textStyles">Available</p>
          </div>
        </div>
        <hr></hr>
        <PaySectionComponent amount={this.amount} selected={this.selected} onDeleted={this.handleDeleted}/>
      </div>
    );
  }
}

export default mainComponent;