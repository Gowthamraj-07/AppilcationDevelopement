// About.js
import React from 'react';
import './about.css';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessibleIcon from '@mui/icons-material/Accessible';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import StarIcon from '@mui/icons-material/Star';

const About = () => {
  return (
    <div className="about-container">
      <div className="features">
        <h3>Features</h3>
        <div className="features-list" >
          <div>
          <div className="feature-item"><LocalBarIcon /> Alcohol Served</div>
          <div className="feature-item"><SmokeFreeIcon /> Smoking area</div>
          <div className="feature-item"><AcUnitIcon /> Air Condition</div>
          <div className="feature-item"><RestaurantIcon /> Take-away</div>
          <div className="feature-item"><MusicNoteIcon /> Live Music</div>
          <div className="feature-item"><LocalParkingIcon /> Valet Parking</div>
          </div>
          <div>
          <div className="feature-item"><AccessibleIcon /> Wheelchair Accessible</div>
          <div className="feature-item"><SportsSoccerIcon /> Live Sports Screening</div>
          <div className="feature-item"><CheckroomIcon /> Formal Attire</div>
          <div className="feature-item"><ChildCareIcon /> Kids Allowed</div>
          <div className="feature-item"><BrunchDiningIcon /> Sunday Brunches</div>
          <div className="feature-item"><LocalDiningIcon /> Buffet</div>
          </div>
        </div>
      </div>
      <div className="reviews">
        <h3>Reviews & Ratings</h3>
        <div className="rating">
          <span className="rating-value">4.4</span>
          <div className="stars">
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon style={{ color: '#ccc' }} />
          </div>
          <span className="reviews-count">21 reviews</span>
        </div>
        
      </div>
    </div>
  );
};

export default About;
