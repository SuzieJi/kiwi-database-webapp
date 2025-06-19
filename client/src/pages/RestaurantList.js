import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography} from '@mui/material';

function RestaurantList() {
  const { cuisine } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
  };

useEffect(() => {
    console.log('Fetching data for cuisine:', cuisine);
    fetch(`http://localhost:8080/restaurants/${cuisine}`)
      .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [cuisine]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCardClick = (id) => {
    navigate(`/restaurant-details/${id}`);
  };

  return (
    <div style={{ margin: '60px' }}>
      <h2 style={headerStyle}>{capitalizeFirstLetter(cuisine)} Restaurants</h2>
      <Grid container spacing={2}>
        {restaurants.map(restaurant => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(restaurant.id)}>
                <CardContent>
                  <Typography variant="h5">{restaurant.name}</Typography>
                  <Typography variant="body1">Address: {restaurant.street}</Typography>
                  <Typography variant="body1">Boro: {restaurant.boro}</Typography>
                  <Typography variant="body1">Tel: {restaurant.phone}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RestaurantList;