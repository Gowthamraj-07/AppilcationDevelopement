import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button'; // Correct import path for Button

export default function Header() {
  const scrollToOnmind = () => {
    const onmindElement = document.getElementById('onmind-section');
    if (onmindElement) {
      onmindElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollBy(0, 560); // Adjust the value to fit your layout
    } else {
      console.error('Onmind section not found');
    }
  };

  return (
    <div id='header'>
      <div className='branding' style={{ padding: "20vh 0 0 20vh", fontWeight: '600' }}>
        <h1 style={{ fontSize: '60px' }}>EatEase</h1>
        <h4>it's not just Food, it's an Experience.</h4>
      </div>
      <div className='branding' style={{ padding: "5vh 0 0 20vh" }}>
        <Button className='custom-button' onClick={scrollToOnmind}>
          Explore Foods
        </Button>
      </div>
    </div>
  );
}
