import React from 'react';

const Ground = ({ position, height, width }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        width: '120%',
        height: `${height}px`,
        backgroundColor : '#3f2915',
        transform: `translateX(${position}px)`,
        zIndex: 998,
      }}
    />
  );
};

export default Ground;