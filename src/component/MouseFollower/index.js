import React, { useState, useEffect } from 'react';
import "./style.css";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => { 
    setPosition({ x: event.clientX, y: event.clientY });
    console.log(event.clientX , event.clientY);
  };
 
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  return (
    <> 
      <div className="circle" style={{ left: position.x, top: position.y }}>
        <div className="mini-circle"></div>
      </div>
    </>
  );
};

export default MouseFollower;
