import React, { Component }  from 'react';
import './seatingStyle.scss';

class SeatingComponent extends Component {
  constructor(props) {
    super(props);
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

  handleClick = seating => {
    const index = this.selected.indexOf(seating.name);
    if (index === -1) {
      this.addSelection(seating.name);
      this.amountHandle('add');
      this.setState({ active: true });
      this.getClassName(seating);
    } else {
      this.deleteButtonOnClick(seating.name, index);
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

  deleteButtonOnClick(id, index) {
    this.selected.splice(index, 1);
    this.props.onDeleted(id)
  }

  getClassName = (seating) => {
    if (seating.available) {
      if(this.props.selected.length > 0) {
        const findClass = this.findSelection(seating);
        return findClass;
      } else {
        return 'available glow-button commonBtn';
      }
    } else {
      return 'booked commonBtn';
    }
  }

  findSelection = (seating) => {
    const match = this.props.selected.find((selected) => {
      if (selected === seating.name) {
        return selected;
      } 
    });
    if (match) {
      return 'available glow-button commonBtn buttonActive';
    } else {
      return 'available glow-button commonBtn';
    } 
  }

  render() {
    return (<div className="seatingBoard">
    {this.state.data.map((seating) => {
      return <button onClick={() => this.handleClick(seating)} 
      className={this.getClassName(seating)}
      key={seating.name} disabled={seating.available ? false : true} >{seating.name}</button>
    }
    )}
    </div>);
  }
}

export default SeatingComponent;