import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface PackType {
  id: number;
  name: string;
  price: number;
  totalCards: number;
  description: string;
}

const packs: PackType[] = [
  {
    id: 1,
    name: 'Basic Pack',
    price: 500,
    totalCards: 5,
    description: 'Contains 5 cards with one guaranteed gold card'
  },
  {
    id: 2,
    name: 'Premium Pack',
    price: 1000,
    totalCards: 8,
    description: 'Contains 8 cards with four guaranteed gold cards'
  },
  {
    id: 3,
    name: 'Ultimate Pack',
    price: 2000,
    totalCards: 10,
    description: 'Contains 10 cards with one guaranteed 85+ rated card'
  }
];

const Store = () => {
  const { coins, updateCoins } = useAuth();

  const handleBuyPack = (pack: PackType) => {
    if (coins >= pack.price) {
      updateCoins(-pack.price);
      // TODO: Implement pack opening animation and API call
      console.log(`Bought ${pack.name}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Store
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="primary">
          Your Coins: 🪙 {coins.toLocaleString()}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {packs.map((pack) => (
          <Grid item xs={12} sm={6} md={4} key={pack.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
                border: '1px solid #333'
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  {pack.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {pack.description}
                </Typography>
                <Typography variant="h6" color="secondary">
                  🪙 {pack.price.toLocaleString()}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={coins < pack.price}
                  onClick={() => handleBuyPack(pack)}
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: 'black',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                    }
                  }}
                >
                  Buy Pack
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Store; 