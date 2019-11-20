import React, { Component }  from 'react';
import './modalStyle.scss';

class ModalComponent extends Component {
  
  handleClose = () => {
    console.log('cerrar modal');
    this.props.onClose(false);
  } 
  
  render() {
    return(
      <div className={this.props.show ? 'showModal' : 'hideModal'}>
        <div className="backScreen"></div>
        <div className="modal">
          <div className="modalHeader">
            <h3>Challenge completed!</h3>
          </div>
          <div className="modalBody">
            <img src="./papa_kawaii_video.gif" alt="kawaii potato character" className="imgModal"></img>
          </div>
          <div className="modalFooter">
            <button className="closeBtn" onClick={() => this.handleClose()}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }  
  
}

export default ModalComponent;