import { MyContext } from '../../MyContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarsIcon from '@mui/icons-material/Stars';
import './Hotels.css';

export default function DinningHotels() {
    const { sharedState, setSharedState } = useContext(MyContext)
    const [hotels, setHotels] = useState([]);
    const { menu, setMenu } = useContext(MyContext);
    const navigate = useNavigate();

    // Fetch data when component mounts
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:7777/hotels');
                const data = await response.json();
                console.log('Fetched Hotels:', data); // Log the fetched data
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotels();
    }, []); // Empty dependency array ensures this runs once on mount

    // Filter hotels based on sharedState
    const filteredHotels = hotels.filter(hotel => hotel.city === sharedState);
    console.log('Filtered Hotels:', filteredHotels); // Log the filtered hotels

    const handleClick = (hotel) => {
        console.log('Selected Hotel:', hotel); // Log the selected hotel
        setMenu(hotel);
        navigate('/menu')
    };

    // Render the filtered hotels
    return (
        <div style={{ textAlign: 'left', margin: '10px 30px' }}>
            <h3 style={{ marginLeft: '20px' }}>Dine in Now ! {sharedState}</h3>
            <div className="hotel-container">
                {filteredHotels.map(hotel => (
                    <div key={hotel.hotelId} className="hotel-card" onClick={() => handleClick(hotel)}>
                        <img src={hotel.hotelUrl} alt={hotel.hotelName} className="hotel-image" />
                        <div className="hotel-info">
                            <h2 className="hotel-name">{hotel.hotelName}</h2>
                            <p className="hotel-rating">
                                <StarsIcon style={{ color: 'green', height: '20px' }} />
                                {hotel.rating}
                            </p>
                            <p className="hotel-location">{hotel.hotelLocation}</p>
                            <p className="hotel-description">{hotel.style}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
