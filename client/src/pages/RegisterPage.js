import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const config = require('../config.json');

const backgroundImage = '/images/kiwi-icon.jpg';


const styles = {
    page: {
        display: 'flex',
        minHeight: '100vh',
    },
    leftContainer: {
        flexBasis: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5%',
    },
    rightContainer: {
        flexBasis: '50%',
        padding: '0.5%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
    },
    formContainer: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        height: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        backdropFilter: 'blur(8px)',
    },
};

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch(`http://${config.server_host}:${config.server_port}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseText = await response.text();
            const trimmedResponseText = responseText.trim();
            console.log(trimmedResponseText);
            alert(trimmedResponseText)

            if (response.ok) {
                navigate('/login');
            } else {
                if (response.status === 400) {
                    alert('Username already exists. Please try again.');
                } else {
                    alert('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }        
    }

    return (
        <div style={styles.page}>
            <Container style={styles.leftContainer}>
                <Box sx={styles.formContainer}>
                    <Typography variant="h4" gutterBottom align="center">
                         Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && (
                            <Typography style={styles.errorMessage}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                        Submit
                        </Button>
                    </form>
                </Box>
            </Container>
            <div style={styles.rightContainer}>

            </div>
        </div>
    );
}