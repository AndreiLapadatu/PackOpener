import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FIFA Pack Opening
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Collect your favorite players and build your ultimate team!
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
              border: '1px solid #333',
            }}
          >
            <Typography variant="h5" gutterBottom color="primary">
              Basic Pack
            </Typography>
            <Typography paragraph>
              Start your collection with our basic pack. Contains 5 cards with one guaranteed gold player!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/store')}
              sx={{
                background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                color: 'black',
              }}
            >
              Get Started
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
              border: '1px solid #333',
            }}
          >
            <Typography variant="h5" gutterBottom color="primary">
              Premium Pack
            </Typography>
            <Typography paragraph>
              Upgrade your collection with our premium pack. Includes 8 cards with four guaranteed gold players!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/store')}
              sx={{
                background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                color: 'black',
              }}
            >
              Explore Premium
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
              border: '1px solid #333',
            }}
          >
            <Typography variant="h5" gutterBottom color="primary">
              Ultimate Pack
            </Typography>
            <Typography paragraph>
              Experience the best with our ultimate pack. Get 10 cards with one guaranteed 85+ rated player!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/store')}
              sx={{
                background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                color: 'black',
              }}
            >
              Go Ultimate
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {!user && (
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start?
          </Typography>
          <Typography variant="body1" paragraph>
            Create an account to start collecting players and building your dream team!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
              color: 'black',
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home; 