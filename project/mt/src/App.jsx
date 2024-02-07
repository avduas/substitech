import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Card, Modal } from 'react-bootstrap';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [cardsInfo, setCardsInfo] = useState([]);

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://sub-tech-be.vercel.app/mt/getsubteacher')
      .then(response => response.json())
      .then(data => setCardsInfo(data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleAccept = (index) => {
    setCurrentCardIndex(index);
    setShowModal(true);
  };

  const handleReject = (index) => {
    setCardsInfo(prevCards => prevCards.filter((_, i) => i !== index));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCardIndex(null);
  };

  const handleConfirmAction = (action) => {
    if (action === "accept") {
      const cardToUpdate = cardsInfo[currentCardIndex];
      fetch(`https://sub-tech-be.vercel.app/mt/getsubteacher/${cardToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardToUpdate),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update card');
          }
          console.log('Card updated successfully');
        })
        .catch(error => console.error('Error updating card:', error));
    } else {
      console.log("Card rejected");
      handleReject(currentCardIndex);
    }
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <div className='row'>
        {cardsInfo.map((card, index) => (
          <div key={index} className='col-md-4 mb-4'>
            <Card>
              <Card.Body>
                <Card.Title className='border-bottom'>{card.date} {card.time}</Card.Title>
                <Card.Text>
                  Age:{card.age} <br />
                  Class:{card.class} <br />
                  Price:{card.price} <br />
                </Card.Text>
                <div className='d-flex justify-content-between'>
                  <Button variant='primary' onClick={() => handleAccept(index)}>Accept</Button>
                  <Button variant='danger' onClick={() => handleReject(index)}>Reject</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => handleConfirmAction('accept')}>Accept</Button>
          <Button variant='danger' onClick={() => handleConfirmAction("reject")}>Reject</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function EmptyPage() {
  return <div>This is an empty page</div>;
}

export default App;
