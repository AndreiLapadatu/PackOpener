import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

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

const getQuicksellValue = (rarity: string): number => {
  switch (rarity) {
    case 'gold':
      return 300;
    case 'silver':
      return 150;
    case 'bronze':
      return 100;
    default:
      return 0;
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'gold':
      return '#FFD700';
    case 'silver':
      return '#C0C0C0';
    case 'bronze':
      return '#CD7F32';
    default:
      return '#ffffff';
  }
};

const CardDisplay = ({ card, onQuicksell }: { card: PlayerCard; onQuicksell: (card: PlayerCard) => void }) => {
  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
        border: `2px solid ${getRarityColor(card.rarity)}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box 
          sx={{ 
            position: 'relative', 
            mb: 2,
            paddingTop: '133%', // 4:3 aspect ratio
            backgroundColor: '#333',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          {card.imageUrl && (
            <img
              src={card.imageUrl}
              alt={card.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                // If image fails to load, remove the src to show the background
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <Chip
            label={card.overall}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: getRarityColor(card.rarity),
              color: 'black',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: '1.1rem' }}>
          {card.name}
        </Typography>
        <Typography color="text.secondary" align="center" sx={{ fontSize: '0.9rem' }}>
          {card.team}
        </Typography>
        <Typography color="text.secondary" variant="body2" align="center" gutterBottom>
          {card.league}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onQuicksell(card)}
          sx={{
            mt: 'auto',
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            color: 'black',
            '&:hover': {
              background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
            }
          }}
        >
          Quicksell for {getQuicksellValue(card.rarity)} 🪙
        </Button>
      </CardContent>
    </Card>
  );
};

const Collection = () => {
  const { updateCoins, user } = useAuth();
  const [cards, setCards] = useState<PlayerCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('overall');
  const [quicksellDialog, setQuicksellDialog] = useState<{
    open: boolean;
    card: PlayerCard | null;
  }>({ open: false, card: null });

  useEffect(() => {
    if (!user?.username) return; // Don't load cards if no user is logged in
    const savedCards = JSON.parse(localStorage.getItem(`userCards_${user.username}`) || '[]');
    // Ensure each card has a unique instance ID
    const cardsWithInstanceIds = savedCards.map((card: PlayerCard) => ({
      ...card,
      instanceId: card.instanceId || `${card.id}-${Date.now()}-${Math.random()}`
    }));
    setCards(cardsWithInstanceIds);
  }, [user?.username]); // Re-run when username changes

  const handleQuicksell = (card: PlayerCard) => {
    setQuicksellDialog({ open: true, card });
  };

  const confirmQuicksell = () => {
    if (!quicksellDialog.card || !user?.username) return;

    const quicksellValue = getQuicksellValue(quicksellDialog.card.rarity);
    updateCoins(quicksellValue);

    // Remove only the specific instance of the card
    const cardInstanceId = quicksellDialog.card.instanceId;
    const updatedCards = cards.filter(c => c.instanceId !== cardInstanceId);
    
    setCards(updatedCards);
    localStorage.setItem(`userCards_${user.username}`, JSON.stringify(updatedCards));
    setQuicksellDialog({ open: false, card: null });
  };

  const filteredCards = cards
    .filter((card) => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.league.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = rarityFilter === 'all' || card.rarity === rarityFilter;
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'overall':
          return b.overall - a.overall;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'team':
          return a.team.localeCompare(b.team);
        default:
          return 0;
      }
    });

  // Group cards by name for display count
  const cardCounts = filteredCards.reduce((acc, card) => {
    acc[card.name] = (acc[card.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Collection
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search cards"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Rarity</InputLabel>
          <Select
            value={rarityFilter}
            label="Rarity"
            onChange={(e) => setRarityFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="bronze">Bronze</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="overall">Rating</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="team">Team</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.instanceId}>
            <Box position="relative">
              <CardDisplay card={card} onQuicksell={handleQuicksell} />
              {cardCounts[card.name] > 1 && (
                <Chip
                  label={`×${cardCounts[card.name]}`}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {filteredCards.length === 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No cards found. Try different filters or buy some packs!
          </Typography>
        </Box>
      )}

      <Dialog
        open={quicksellDialog.open}
        onClose={() => setQuicksellDialog({ open: false, card: null })}
      >
        <DialogTitle>Confirm Quicksell</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to quicksell one {quicksellDialog.card?.name} for {quicksellDialog.card && getQuicksellValue(quicksellDialog.card.rarity)} coins?
            {quicksellDialog.card && cardCounts[quicksellDialog.card.name] > 1 && (
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                You have {cardCounts[quicksellDialog.card.name]} copies of this card.
              </Typography>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuicksellDialog({ open: false, card: null })}>
            Cancel
          </Button>
          <Button onClick={confirmQuicksell} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Collection; 