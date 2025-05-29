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
} from '@mui/material';

interface PlayerCard {
  id: number;
  name: string;
  team: string;
  league: string;
  overall: number;
  rarity: 'bronze' | 'silver' | 'gold';
  imageUrl?: string;
}

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

const Collection = () => {
  const [cards, setCards] = useState<PlayerCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('overall');

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
    setCards(savedCards);
  }, []);

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
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${card.id}-${Math.random()}`}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
                border: `1px solid ${getRarityColor(card.rarity)}`,
              }}
            >
              <CardContent>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        paddingTop: '133%',
                        backgroundColor: '#333',
                        borderRadius: '4px',
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
                    }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom align="center">
                  {card.name}
                </Typography>
                <Typography color="text.secondary" align="center">
                  {card.team}
                </Typography>
                <Typography color="text.secondary" variant="body2" align="center">
                  {card.league}
                </Typography>
              </CardContent>
            </Card>
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
    </Container>
  );
};

export default Collection; 