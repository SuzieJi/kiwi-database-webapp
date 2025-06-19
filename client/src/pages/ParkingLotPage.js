import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Container } from '@mui/material';
import axios from 'axios';

const config = require('../config.json');

const containerStyle = {
    width: '100vw',
    height: '1300px'
  };


  export default function ParkingLotPage() {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        axios.get(`http://${config.server_host}:${config.server_port}/parkinglot`)
            .then(response => {
                const spots = response.data;
                setParkingSpots(spots);
                if (spots.length > 0) {
                    setMapCenter({
                        lat: spots[0].latitude,
                        lng: spots[0].longitude
                    });
                }
            })
            .catch(error => console.error('Error fetching parking lot data:', error));
    }, []);

    //const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

    return (
        <Container style={{ display: 'flex', height: '100vh', maxWidth: '100%', padding: 0 }}>
            <LoadScript googleMapsApiKey="key">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={12}
                >
                    {parkingSpots.map((spot, index) => (
                        <Marker
                            key={index}
                            position={{ lat: spot.latitude, lng: spot.longitude }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </Container>
    );
}