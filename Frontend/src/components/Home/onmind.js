import React from 'react';
import biryani from './images/Biryani.avif';
import cake from './images/cake.avif';
import parotta from './images/Parotta.avif';
import pizza from './images/Pizza.avif';
import salad from './images/salad.avif';
import shake from './images/Shake.avif';
import chinese from './images/Chinese.avif';
import icecream from './images/icecream.avif';
import north from './images/NorthIndian.avif';
import pastry from './images/pastry.avif';
import rolls from './images/Rolls.avif';
import './onmind.css';

function Onmind() {
  const photos = [biryani, cake, parotta, pizza, salad, shake, chinese, icecream, north, pastry, rolls];

  return (
    <div id="onmind-section" style={{ textAlign: 'left', marginBottom: '30px' }}>
      <h3 style={{ padding: '30px 0 0 50px' }}>What's on your mind?</h3>
      <div className="photo-row">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default Onmind;
