import React from 'react';

const Bird = ({ position, isGameOver }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '100px',
        top: `${position}px`,
        width: '50px',
        height: '50px',
        backgroundImage: 'url(/bird.png)',
        backgroundSize: 'contain',
        // backgroundRepeat: 'no-repeat',
        // transition: 'transform 0.1',
        transform: `rotate(${isGameOver ? '90deg' : '0deg'})`,
        zIndex: 999,
      }}
    />
  );
};

export default Bird;