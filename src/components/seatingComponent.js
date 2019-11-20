import React, { Component }  from 'react';
import './mainStyle.scss';

class SeatingComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      amount: this.amount,
      active: this.active
      // excedMaximum: false
    }
    this.amount = 0;
    this.selected = [];
    this.active = false;
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


  // maxOfTickets() {
  //   const maxTickets = 8;
  //   if (this.selected.length >= maxTickets) {
  //     this.setState({ excedMaximum: true });
  //   } else if(this.excedMaximum === true && this.selected.length <= maxTickets) {
  //     this.setState({ excedMaximum: false });
  //   }
  // }

  handleClick = id => {
    const index = this.selected.indexOf(id);
    if (index === -1) {
      this.addSelection(id);
      this.amountHandle('add');
      this.setState({ active: true });
    } else {
      this.deleteButtonOnClick(index);
      this.amountHandle('remove');
      this.setState({ active: false });
    }
    // sthis.maxOfTickets();
  }

  amountHandle = (opp) => {
    if (opp === 'add') {
      this.amount = this.amount + 8;
      this.props.onAmount(this.amount); 
    } else if (opp === 'remove') {
      this.amount = this.amount - 8;
      this.props.onAmount(this.amount);
    }
  }

  addSelection = (id) => {
    this.selected.push(id);
    this.props.onSelection(id);
  }

  deleteButtonOnClick(index) {
    this.selected.splice(index, 1);
  }


  render() {
    return (<div className="seatingBoard">
    {this.state.data.map((seating) => {
      return <button onClick={() => this.handleClick(seating.name)} 
      className={seating.available ? "available glow-button commonBtn" : "booked commonBtn"}
      key={seating.name} disabled={seating.available ? false : true} >{seating.name}</button>
    }
    )}
    </div>);
  }
}

export default SeatingComponent;