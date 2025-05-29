import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface PlayerHint {
  id: number;
  hints: string[];
  answer: string;
  reward: number;
  isCompleted?: boolean;
}

const playerHints: PlayerHint[] = [
  {
    id: 1,
    hints: [
      "French forward who scored a hat-trick in a World Cup final",
      "Won the World Cup in 2018",
      "Plays for Paris Saint-Germain",
      "Born in Paris in 1998"
    ],
    answer: "Kylian Mbappe",
    reward: 1500
  },
  {
    id: 2,
    hints: [
      "Portuguese forward who has scored over 800 career goals",
      "Has won five Champions League titles",
      "Currently plays in Saudi Arabia",
      "Known for his 'Siu' celebration"
    ],
    answer: "Cristiano Ronaldo",
    reward: 1500
  },
  {
    id: 3,
    hints: [
      "Argentine forward who led his country to World Cup victory in 2022",
      "Has won multiple Ballon d'Or awards",
      "Played most of his career at Barcelona",
      "Currently plays in MLS"
    ],
    answer: "Lionel Messi",
    reward: 1500
  }
];

const GuessPlayer = () => {
  const { updateCoins, user } = useAuth();
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [completedPlayers, setCompletedPlayers] = useState<number[]>(() => {
    if (!user?.username) return [];
    const saved = localStorage.getItem(`completedGuesses_${user.username}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerHint | null>(null);
  const [revealedHints, setRevealedHints] = useState<number>(1);

  useEffect(() => {
    if (!user?.username) {
      setCompletedPlayers([]);
      return;
    }
    const saved = localStorage.getItem(`completedGuesses_${user.username}`);
    setCompletedPlayers(saved ? JSON.parse(saved) : []);
  }, [user?.username]);

  useEffect(() => {
    if (!user?.username) return;
    localStorage.setItem(`completedGuesses_${user.username}`, JSON.stringify(completedPlayers));
  }, [completedPlayers, user?.username]);

  const handlePlayerSelect = (player: PlayerHint) => {
    setSelectedPlayer(player);
    setRevealedHints(1);
    setCurrentGuess('');
    setMessage(null);
  };

  const handleGuess = () => {
    if (!selectedPlayer || !currentGuess || !user?.username) return;

    if (currentGuess.toLowerCase() === selectedPlayer.answer.toLowerCase()) {
      updateCoins(selectedPlayer.reward);
      setMessage({
        type: 'success',
        text: `Correct! You've earned ${selectedPlayer.reward} coins!`
      });
      setCompletedPlayers([...completedPlayers, selectedPlayer.id]);
      setCurrentGuess('');
    } else {
      setMessage({
        type: 'error',
        text: 'Wrong guess. Try again!'
      });
    }
  };

  const revealNextHint = () => {
    if (selectedPlayer && revealedHints < selectedPlayer.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Guess the Player
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
        <Paper sx={{ 
          p: 3, 
          flexGrow: 1,
          background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
          border: '1px solid #333'
        }}>
          <Typography variant="h6" gutterBottom>
            Available Challenges
          </Typography>
          <List>
            {playerHints.map((player) => (
              <React.Fragment key={player.id}>
                <ListItem
                  button
                  onClick={() => handlePlayerSelect(player)}
                  disabled={completedPlayers.includes(player.id)}
                  sx={{
                    opacity: completedPlayers.includes(player.id) ? 0.5 : 1,
                  }}
                >
                  <ListItemText
                    primary={`Challenge #${player.id}`}
                    secondary={completedPlayers.includes(player.id) ? 'Completed' : `Reward: ${player.reward} coins`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Paper sx={{ 
          p: 3, 
          flexGrow: 2,
          background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
          border: '1px solid #333'
        }}>
          {selectedPlayer ? (
            <>
              <Typography variant="h6" gutterBottom>
                Hints:
              </Typography>
              <List>
                {selectedPlayer.hints.slice(0, revealedHints).map((hint, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={hint} />
                  </ListItem>
                ))}
              </List>
              
              {revealedHints < selectedPlayer.hints.length && (
                <Button
                  variant="outlined"
                  onClick={revealNextHint}
                  sx={{ mt: 2, mb: 3 }}
                >
                  Reveal Next Hint
                </Button>
              )}

              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Your guess"
                  variant="outlined"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  disabled={completedPlayers.includes(selectedPlayer.id)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleGuess}
                  disabled={!currentGuess || completedPlayers.includes(selectedPlayer.id)}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: 'black',
                  }}
                >
                  Submit Guess
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Select a challenge to begin
            </Typography>
          )}

          {message && (
            <Alert 
              severity={message.type} 
              sx={{ mt: 2 }}
              variant="filled"
            >
              {message.text}
            </Alert>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default GuessPlayer; 