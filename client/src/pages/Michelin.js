import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Michelin() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ cuisine: '', price: '', star: '' });

  
    useEffect(() => {
      fetch('http://localhost:8080/michelin')
        .then(response => {
            console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setRestaurants(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        });
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredRestaurants = restaurants.filter(restaurant => {
        const { cuisine, price, star } = filters;
        return (
            (cuisine === '' || restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()) &&
            (price === '' || restaurant.price === price) &&
            (star === '' || restaurant.star.toString() === star)
        );
    });
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
        <Box textAlign="center" mt={4}>
            <Typography variant="h4" gutterBottom>
                Michelin Restaurants
            </Typography>
            <Box display="flex" justifyContent="center" mb={3}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="cuisine-filter-label">Cuisine</InputLabel>
                    <Select
                        labelId="cuisine-filter-label"
                        id="cuisine-filter"
                        value={filters.cuisine}
                        name="cuisine"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Chinese">Chinese</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="Italian">Italian</MenuItem>
                        <MenuItem value="Mexican">Mexican</MenuItem>
                        <MenuItem value="Thai">Thai</MenuItem>
                        <MenuItem value="American">American</MenuItem>
                        <MenuItem value="Korean">Korean</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="price-filter-label">Price</InputLabel>
                    <Select
                        labelId="price-filter-label"
                        id="price-filter"
                        value={filters.price}
                        name="price"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="$">$</MenuItem>
                        <MenuItem value="$$">$$</MenuItem>
                        <MenuItem value="$$$">$$$</MenuItem>
                        <MenuItem value="$$$$">$$$$</MenuItem>
                        <MenuItem value="$$$$$">$$$$$</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="star-filter-label">Star</InputLabel>
                    <Select
                        labelId="star-filter-label"
                        id="star-filter"
                        value={filters.star}
                        name="star"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={3}
                sx={{
                    '& > .MuiCard-root': {
                        width: 'calc(25% - 20px)',
                        margin: '10px',
                    },
                }}
            >
                {filteredRestaurants.map(restaurant => (
                    <Card key={restaurant.id}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {restaurant.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cuisine: {restaurant.cuisine}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: {restaurant.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Star: {restaurant.star}
                            </Typography>
                            <a href={restaurant.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                Explore More
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
  }
  
  export default Michelin;

