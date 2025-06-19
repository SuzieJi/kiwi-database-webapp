import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your Google Maps API key from environment variables
  const apiKey = "AIzaSyByC6Q69vElHHEfbl3y8-5gdrXgNyFi1LQ";

  useEffect(() => {
    setLoading(true);

    // Fetch restaurant details first
    fetch(`http://localhost:8080/restaurant-details/${id}`)
      .then(response => response.json())
      .then(restaurantData => {
        setRestaurant(restaurantData);
        // After setting restaurant data, fetch parking lots
        return fetch(`http://localhost:8080/parkinglots/nearby?latitude=${restaurantData.latitude}&longitude=${restaurantData.longitude}`);
      })
      .then(response => response.json())
      .then(parkingLotsData => {
        setParkingLots(parkingLotsData); // Assume this API call returns lots within 500 meters
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const mapCenter = restaurant ? { lat: restaurant.latitude, lng: restaurant.longitude } : null;

  console.log('Map Center:', mapCenter);
  console.log('Marker Position:', mapCenter);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{  maxWidth: '800px', width: '100%' }}>
        {restaurant && (
          <>
            <h2>{restaurant.name}</h2>
            <p>Address: {restaurant.street}</p>
            <p>Phone: {restaurant.phone}</p>
            <p>Cuisine: {restaurant.cuisine}</p>
          </>
        )}

        <h3>Parking Lots Nearby:</h3>
        {parkingLots.length > 0 ? (
          parkingLots.map(parkingLot => (
            <div key={parkingLot.id}>
              <p>Distance: {Math.round(calculateDistance(restaurant.latitude, restaurant.longitude, parkingLot.latitude, parkingLot.longitude))} meters</p>
            </div>
          ))
        ) : (
          <p>No parking lots within 500 meters.</p>
        )}

        {mapCenter && (
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={mapCenter}
              zoom={15}
            >
      
              <Marker position={mapCenter} label={{
                text: 'R', // Label text
                color: 'red', // Label text color
                fontSize: '12px', // Label font size
              }} />

              {parkingLots.map(lot => (
                <Marker key={lot.id} position={{ lat: lot.latitude, lng: lot.longitude }} label={'P'} />
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
}



// Utility function to calculate distance between two lat/lng points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in meters
  return distance;
}

export default RestaurantDetails;