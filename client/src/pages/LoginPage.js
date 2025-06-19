import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
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

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            console.log(response);

            const data = await response.json();
            if (response.ok) {
                alert('Login successful');
                navigate('/home');
            } else {
                alert(data.message || 'Username or password incorrect');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        }
    }

    return (
        <div style={styles.page}>
            <Container style={styles.leftContainer}>
                <Box sx={styles.formContainer}>
                    <Typography variant="h4" gutterBottom align="center">
                        Login
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" align="center">
                                Don't have an account? <Link to="/register">Sign Up</Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Container>
            <div style={styles.rightContainer}>

            </div>
        </div>
    );
}