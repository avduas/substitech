import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Cards = ({ cardsInfo, handleAccept, handleReject }) => {
  return (
    <div className='row'>
      {cardsInfo.map((card, index) => (
        <div key={index} className='col-md-4 mb-4'>
          <Card>
            <Card.Body>
              <Card.Title className='border-bottom'>{card.date} {card.time}</Card.Title>
              <Card.Text>
                Age: {card.age} <br />
                Class: {card.class} <br />
                Price: {card.price} <br />
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
  );
};

export default Cards;
