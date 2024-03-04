import React from 'react';
import backgroundImage from '../assets/Conceptual banner of web technology 03.jpg';

const ComponentWithBackgroundImage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* Your component content here */}
    </div>
  );
};

export default ComponentWithBackgroundImage;
