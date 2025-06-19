import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';

function NavText({ href, text, isMain }) {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h6'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink    
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}

export default function NavBar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <NavText href='/home' text='KIWI' isMain />
          <NavText href='/home' text='HOME' />
          <NavText href='/michelin' text='MICHELIN' />
          <NavText href='/parkinglot' text='PARKING' />
          <NavText href='/hotel' text='LODGING' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
