import React from 'react';

const Pipe = ({ x, topHeight, bottomHeight, width, gap, gameHeight, groundHeight }) => {
  return (
    <>
      {/* TOP */}
      <div
        style={{
          position: 'absolute',
        //   backgroundImage: 'url(/pipe.png)',
        //   backgroundSize: 'contain',
          left: `${x}px`,
          top: 0,
          width: `${width}px`,
          height: `${topHeight}px`,
          backgroundColor: 'green',
          border: '2px solid #000',
          boxSizing: 'border-box',
          zIndex: 5,
        }}
      />
      {/* BOTTOM */}
      <div
        style={{
          position: 'absolute',
        //   backgroundImage: 'url(/pipe.png)',
        //   backgroundSize: 'contain',
          left: `${x}px`,
          top: `${gameHeight - bottomHeight - groundHeight}px`,
          width: `${width}px`,
          height: `${bottomHeight}px`,
          backgroundColor: 'green',
          border: '2px solid #000',
          boxSizing: 'border-box',
          zIndex: 5,
        }}
      />
    </>
  );
};

export default Pipe;