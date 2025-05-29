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
  instanceId?: string;
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

// Update the playerPool with more players and images
const playerPool = {
  gold: [
    { 
      id: 1, 
      name: 'Cristiano Ronaldo', 
      team: 'Al Nassr', 
      league: 'Saudi Pro League', 
      overall: 86, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p20801.png'
    },
    { 
      id: 2, 
      name: 'Mohamed Salah', 
      team: 'Liverpool', 
      league: 'Premier League', 
      overall: 89, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p209331.png'
    },
    { 
      id: 3, 
      name: 'Kevin De Bruyne', 
      team: 'Manchester City', 
      league: 'Premier League', 
      overall: 91, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p192985.png'
    },
    { 
      id: 4, 
      name: 'Kylian Mbappé', 
      team: 'Paris Saint-Germain', 
      league: 'Ligue 1', 
      overall: 91, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p231747.png'
    },
    { 
      id: 5, 
      name: 'Robert Lewandowski', 
      team: 'Barcelona', 
      league: 'La Liga', 
      overall: 90, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p188545.png'
    },
    { 
      id: 6, 
      name: 'Virgil van Dijk', 
      team: 'Liverpool', 
      league: 'Premier League', 
      overall: 89, 
      rarity: 'gold' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p203376.png'
    }
  ],
  silver: [
    { 
      id: 101, 
      name: 'Tim Ream', 
      team: 'Fulham', 
      league: 'Premier League', 
      overall: 74, 
      rarity: 'silver' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p189615.png'
    },
    { 
      id: 102, 
      name: 'Danny Welbeck', 
      team: 'Brighton', 
      league: 'Premier League', 
      overall: 73, 
      rarity: 'silver' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p186146.png'
    },
    { 
      id: 103, 
      name: 'Scott McTominay', 
      team: 'Manchester United', 
      league: 'Premier League', 
      overall: 74, 
      rarity: 'silver' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p221491.png'
    },
    { 
      id: 104, 
      name: 'Divock Origi', 
      team: 'AC Milan', 
      league: 'Serie A', 
      overall: 74, 
      rarity: 'silver' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p200950.png'
    },
    { 
      id: 105, 
      name: 'Sergi Roberto', 
      team: 'Barcelona', 
      league: 'La Liga', 
      overall: 74, 
      rarity: 'silver' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p198141.png'
    }
  ],
  bronze: [
    { 
      id: 201, 
      name: 'Harvey Blair', 
      team: 'Liverpool', 
      league: 'Premier League', 
      overall: 64, 
      rarity: 'bronze' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p246174.png'
    },
    { 
      id: 202, 
      name: 'Kaide Gordon', 
      team: 'Liverpool', 
      league: 'Premier League', 
      overall: 64, 
      rarity: 'bronze' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p246266.png'
    },
    { 
      id: 203, 
      name: 'Luke Mbete', 
      team: 'Manchester City', 
      league: 'Premier League', 
      overall: 63, 
      rarity: 'bronze' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p246104.png'
    },
    { 
      id: 204, 
      name: 'Shea Charles', 
      team: 'Manchester City', 
      league: 'Premier League', 
      overall: 62, 
      rarity: 'bronze' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p247819.png'
    },
    { 
      id: 205, 
      name: 'Rico Lewis', 
      team: 'Manchester City', 
      league: 'Premier League', 
      overall: 64, 
      rarity: 'bronze' as const,
      imageUrl: 'https://www.fifplay.com/img/fifa/23/players/p246103.png'
    }
  ]
};

const Store = () => {
  const { coins, updateCoins, user } = useAuth();
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

    // Ensure each card has a unique ID for storage
    const cardsWithUniqueIds = cards.map(card => ({
      ...card,
      instanceId: `${card.id}-${Date.now()}-${Math.random()}` // Add unique instance ID
    }));

    // Shuffle the cards
    return cardsWithUniqueIds.sort(() => Math.random() - 0.5);
  };

  const handleBuyPack = (pack: PackType) => {
    if (!user?.username) return;
    if (coins >= pack.price) {
      updateCoins(-pack.price);
      const cards = generatePackCards(pack);
      setPackCards(cards);
      setCurrentPack(pack);
      setOpenPack(true);
      
      // Save cards to local storage with their images
      const savedCards = JSON.parse(localStorage.getItem(`userCards_${user.username}`) || '[]');
      localStorage.setItem(`userCards_${user.username}`, JSON.stringify([...savedCards, ...cards]));
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