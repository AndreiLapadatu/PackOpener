import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PlayerCard {
  id: number;
  name: string;
  team: string;
  league: string;
  overall: number;
  rarity: 'bronze' | 'silver' | 'gold';
  imageUrl?: string;
}

interface PackOpeningProps {
  open: boolean;
  onClose: () => void;
  cards: PlayerCard[];
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

const PackOpening: React.FC<PackOpeningProps> = ({ open, onClose, cards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentCardIndex(-1);
      setShowCard(false);
      setTimeout(() => {
        setCurrentCardIndex(0);
      }, 1000);
    }
  }, [open]);

  const handleCardClick = () => {
    if (currentCardIndex < cards.length - 1) {
      setShowCard(false);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
        setShowCard(true);
      }, 300);
    }
  };

  const currentCard = cards[currentCardIndex];

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          {currentCardIndex >= 0 && currentCard && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
              }}
              onClick={handleCardClick}
            >
              <Card
                className={`card-flip ${showCard ? 'flipped' : ''}`}
                sx={{
                  width: 300,
                  cursor: 'pointer',
                  background: `linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)`,
                  border: `2px solid ${getRarityColor(currentCard.rarity)}`,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    {currentCard.imageUrl ? (
                      <img
                        src={currentCard.imageUrl}
                        alt={currentCard.name}
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
                      label={currentCard.overall}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: getRarityColor(currentCard.rarity),
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom align="center">
                    {currentCard.name}
                  </Typography>
                  <Typography color="text.secondary" align="center">
                    {currentCard.team}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" align="center">
                    {currentCard.league}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
          {currentCardIndex >= 0 && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: 'white' }}
            >
              {currentCardIndex < cards.length - 1
                ? 'Click to reveal next card'
                : 'All cards revealed'}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PackOpening; 