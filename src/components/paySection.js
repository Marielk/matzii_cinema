import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './paySectionStyle.scss';
import ModalComponent from './modal';


class PaySectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.show,
      data: [],
      selected: this.selected,
    }
    this.show= false;
    this.selected = this.props.selected;
    this.excedMaximum = false;
  
  }

  
  //bring the seating from json file
  async componentDidMount() {
    
  }
  // // open and close modal
  
  handleShow = () =>{
    this.show = true;
    this.setState({ show: this.show });
  } 
  handleClose = () =>{
    this.show = false;
    this.setState({ show: this.show });
  } 

  deleteSelection(id) {
    this.props.onDeleted(id);
    this.setState({ selected : this.props.selected});
  }

  render() {
    return (  <div>
        <div className="priceInfoRow">
          <p className="textStyles">Price:  ${this.props.amount}USD</p>
          {/* <p className="textStyle">Max. of ticket per buy: 8</p> */}
        </div>
        <div className="lowBlock">
          {/* style="flex-wrap: wrap" */}
          <div className="col-6 selectionWrap">
            {this.props.selected.map((selected) => {
              return <div className="selectedSeating selected" key={selected}>
                        {selected}
                        <div className="crossBtn" onClick={() => this.deleteSelection(selected)}>x</div>
                      </div>
              })}
          </div>
          <div className="col-6 payButtonWrap">
            <button type="button" className="payment_button" id="payBtn" onClick={() => this.handleShow()}>Buy tickets
              <FontAwesomeIcon className="ml-1" icon={ faShoppingCart }/>
            </button>
          </div>
        </div>
        <ModalComponent show={this.show} onClose={this.handleClose}/>
      </div>
      
    )
  }
}

export default PaySectionComponent;