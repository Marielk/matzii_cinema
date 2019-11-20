import React, { Component }  from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ModalComponent extends Component {
  
  handleClose = () => {
    console.log('cerrar modal');
    this.props.show = false;
  } 
  
  render() {
    return(
      <Modal show={this.props.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Challenge completed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="./papa_kawaii_video.gif" alt="kawaii potato character" className="w-100"></img>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.handleClose()}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    )
  }  
  
}

export default ModalComponent;