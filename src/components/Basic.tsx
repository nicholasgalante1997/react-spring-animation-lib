import React from 'react';

// make a card component with 4px border radius and a light blue color and box shadow
const Card = () => (
    <div
        style={{
            borderRadius: '4px',
            backgroundColor: 'cyan',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            padding: '1rem',
            margin: '1rem',
            height: '200px',
            width: '200px',
        }}
    />
);

export default Card;