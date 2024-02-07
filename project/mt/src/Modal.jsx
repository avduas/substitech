import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ showModal, handleCloseModal, handleConfirmAction }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => handleConfirmAction('accept')}>Accept</Button>
        <Button variant='danger' onClick={() => handleConfirmAction('reject')}>Reject</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
