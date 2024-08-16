import { MyContext } from '../../MyContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarsIcon from '@mui/icons-material/Stars';
import './Hotels.css'

export default function Diets() {
    const { sharedState, setSharedState } = useContext(MyContext);
    const [diets, setDiets] = useState([]);
    const { menu, setMenu } = useContext(MyContext);
    const navigate = useNavigate();
    const { option, setOption } = useContext(MyContext);

    // Fetch data when component mounts
    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const response = await fetch('http://localhost:7777/api/diet/getall'); // Adjust endpoint as necessary
                const data = await response.json();
                console.log('Fetched Diets:', data); // Log the fetched data
                setDiets(data);
            } catch (error) {
                console.error('Error fetching diet data:', error);
            }
        };

        fetchDiets();
    }, []); // Empty dependency array ensures this runs once on mount


    const handleClick = (diet) => {
        console.log('Selected Diet:', diet); // Log the selected diet
        setMenu(diet);
        navigate('/diet-details'); // Navigate to diet details page
    };

    // Render the filtered diets
    return (
        <div style={{ textAlign: 'left', margin: '10px 30px' }}>
            {option === 'menu' ? (
                <h3 style={{ marginLeft: '20px' }}>Top Healthy Diets in {sharedState}</h3>
            ) : option === 'dinning' ? (
                <h3 style={{ marginLeft: '20px' }}>Dine in Now, {sharedState}</h3>
            ) : (
                <h3 style={{ marginLeft: '20px' }}>Healthy Diet Options in {sharedState}</h3>
            )}

            <div className="hotel-container">
                {diets.map(diet => (
                    <div key={diet.id} className="hotel-card" onClick={() => handleClick(diet)}>
                        <img src={diet.dietUrl} alt={diet.name} className="hotel-image" />
                        <div className="hotel-info">
                            <h2 className="hotel-name">{diet.name}</h2>
                            <p className="hotel-description">{diet.description}</p>
                            <p className="hotel-rating">Menu Items: {diet.dietMenu.length}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
