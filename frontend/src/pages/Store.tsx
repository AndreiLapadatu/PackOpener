import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import PackOpening from '../components/PackOpening';

interface PackType {
  id: number;
  name: string;
  price: number;
  totalCards: number;
  description: string;
  minGold: number;
  minRating?: number;
}

interface PlayerCard {
  id: number;
  name: string;
  team: string;
  league: string;
  overall: number;
  rarity: 'bronze' | 'silver' | 'gold';
  imageUrl?: string;
}

const packs: PackType[] = [
  {
    id: 1,
    name: 'Basic Pack',
    price: 500,
    totalCards: 5,
    description: 'Contains 5 cards with one guaranteed gold card',
    minGold: 1
  },
  {
    id: 2,
    name: 'Premium Pack',
    price: 1000,
    totalCards: 8,
    description: 'Contains 8 cards with four guaranteed gold cards',
    minGold: 4
  },
  {
    id: 3,
    name: 'Ultimate Pack',
    price: 2000,
    totalCards: 10,
    description: 'Contains 10 cards with one guaranteed 85+ rated card',
    minGold: 1,
    minRating: 85
  }
];

// Sample player pool (you would typically fetch this from your backend)
const playerPool = {
  gold: [
    { id: 1, name: 'Cristiano Ronaldo', team: 'Al Nassr', league: 'Saudi Pro League', overall: 86, rarity: 'gold' as const },
    { id: 2, name: 'Mohamed Salah', team: 'Liverpool', league: 'Premier League', overall: 89, rarity: 'gold' as const },
    // Add more gold players...
  ],
  silver: [
    { id: 101, name: 'Tim Ream', team: 'Fulham', league: 'Premier League', overall: 74, rarity: 'silver' as const },
    { id: 102, name: 'Danny Welbeck', team: 'Brighton', league: 'Premier League', overall: 73, rarity: 'silver' as const },
    // Add more silver players...
  ],
  bronze: [
    { id: 201, name: 'John Smith', team: 'League Two FC', league: 'League Two', overall: 65, rarity: 'bronze' as const },
    { id: 202, name: 'James Wilson', team: 'League One United', league: 'League One', overall: 67, rarity: 'bronze' as const },
    // Add more bronze players...
  ]
};

const Store = () => {
  const { coins, updateCoins } = useAuth();
  const [openPack, setOpenPack] = useState<boolean>(false);
  const [currentPack, setCurrentPack] = useState<PackType | null>(null);
  const [packCards, setPackCards] = useState<PlayerCard[]>([]);

  const generatePackCards = (pack: PackType): PlayerCard[] => {
    const cards: PlayerCard[] = [];
    const remainingSlots = pack.totalCards;
    
    // First, handle guaranteed cards
    if (pack.minRating && pack.minRating >= 85) {
      // Add guaranteed 85+ rated player for Ultimate Pack
      const highRatedPlayers = playerPool.gold.filter(p => p.overall >= 85);
      const player = highRatedPlayers[Math.floor(Math.random() * highRatedPlayers.length)];
      cards.push({ ...player });
    }

    // Add guaranteed gold cards
    const remainingGold = pack.minGold - cards.length;
    for (let i = 0; i < remainingGold; i++) {
      const player = playerPool.gold[Math.floor(Math.random() * playerPool.gold.length)];
      cards.push({ ...player });
    }

    // Fill remaining slots with random cards
    const remaining = remainingSlots - cards.length;
    for (let i = 0; i < remaining; i++) {
      const rarity = Math.random();
      let player;
      if (rarity < 0.6) {
        player = playerPool.bronze[Math.floor(Math.random() * playerPool.bronze.length)];
      } else if (rarity < 0.9) {
        player = playerPool.silver[Math.floor(Math.random() * playerPool.silver.length)];
      } else {
        player = playerPool.gold[Math.floor(Math.random() * playerPool.gold.length)];
      }
      cards.push({ ...player });
    }

    // Shuffle the cards
    return cards.sort(() => Math.random() - 0.5);
  };

  const handleBuyPack = (pack: PackType) => {
    if (coins >= pack.price) {
      updateCoins(-pack.price);
      const cards = generatePackCards(pack);
      setPackCards(cards);
      setCurrentPack(pack);
      setOpenPack(true);
      
      // Save cards to local storage
      const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      localStorage.setItem('userCards', JSON.stringify([...savedCards, ...cards]));
    }
  };

  const handleClosePackOpening = () => {
    setOpenPack(false);
    setCurrentPack(null);
    setPackCards([]);
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

      <PackOpening
        open={openPack}
        onClose={handleClosePackOpening}
        cards={packCards}
      />
    </Container>
  );
};

export default Store; 