import React, { useState, useEffect } from 'react';

const backgroundImage = '/images/hotel_background.jpg';

const HotelPage = () => {
  const [valueScoreHotels, setValueScoreHotels] = useState([]);
  const [reviewDensityHotels, setReviewDensityHotels] = useState([]);
  const [highReviewsHotels, setHighReviewsHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseValueScore = await fetch('http://localhost:8080/hotels/top-by-value-score');
        const dataValueScore = await responseValueScore.json();
        setValueScoreHotels(dataValueScore);

        const responseReviewDensity = await fetch('http://localhost:8080/hotels/top-by-review-density');
        const dataReviewDensity = await responseReviewDensity.json();
        setReviewDensityHotels(dataReviewDensity);

        const responseHighReviews = await fetch('http://localhost:8080/hotels/top-by-high-reviews');
        const dataHighReviews = await responseHighReviews.json();
        setHighReviewsHotels(dataHighReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', paddingLeft: '150px', paddingRight: '150px' }}>
        <h1>Top 10 Lodgings</h1>
      <h2>By Value Score:</h2>
      <ul>
        {valueScoreHotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - Price: ${hotel.price}
          </li>
        ))}
      </ul>
      <h2>By Review Density:</h2>
      <ul>
        {reviewDensityHotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - Price: ${hotel.price}
          </li>
        ))}
      </ul>
      <h2>By High Availability:</h2>
      <ul>
        {highReviewsHotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - Price: ${hotel.price}
          </li>
        ))}
      </ul>
        
        </div>
      
    </div>
  );
};

export default HotelPage;