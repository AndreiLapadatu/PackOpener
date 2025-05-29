import React, { useState } from 'react';
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

// Mock data - replace with API call
const mockCards: PlayerCard[] = [
  {
    id: 1,
    name: 'Cristiano Ronaldo',
    team: 'Al Nassr',
    league: 'Saudi Pro League',
    overall: 86,
    rarity: 'gold',
    imageUrl: 'https://example.com/ronaldo.jpg'
  },
  // Add more mock cards here
];

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('overall');

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

  const filteredCards = mockCards
    .filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (rarityFilter === 'all' || card.rarity === rarityFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'overall') {
        return b.overall - a.overall;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Collection
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search Players"
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
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="overall">Rating</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
            <Card 
              sx={{ 
                height: '100%',
                background: `linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)`,
                border: `1px solid ${getRarityColor(card.rarity)}`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
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
                
                <Typography variant="h6" gutterBottom>
                  {card.name}
                </Typography>
                <Typography color="text.secondary">
                  {card.team}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {card.league}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Collection; 