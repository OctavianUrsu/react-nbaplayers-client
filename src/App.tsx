import React, { useState } from 'react';
import './App.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';

import { debounce } from 'lodash';

interface Player {
  playerId: string;
  firstName: string;
  lastName: string;
  teamId: number;
}

const CardContentNoPadding = styled(CardContent)(`
  padding: 16px;
  &:last-child {
    padding-bottom: 16px;
  }
`);

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

function App() {
  // State for found players and selected player
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  // Autocomplete states for search results opening and loading
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search and call to API
  const debouncedSearch = React.useRef(
    debounce(async (inputValue: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/players/search?name=${inputValue}`
        );
        const players = await response.json();

        setPlayers(players);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }, 500)
  ).current;

  // Handle Autocomplete input change
  const handleInputChange = (value: string) => {
    if (value.length > 2) {
      debouncedSearch(value);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setPlayers([]);
    }
  }, [open]);

  const searchBox = (
    <Autocomplete
      id='player-search'
      forcePopupIcon={false}
      filterOptions={(x) => x}
      open={open}
      onOpen={(e) =>
        (e.target as HTMLInputElement).value.length > 2 && setOpen(true)
      }
      onClose={() => setOpen(false)}
      options={players}
      getOptionLabel={(player) => player.firstName + ' ' + player.lastName}
      isOptionEqualToValue={(o, v) => o.playerId === v.playerId}
      loading={isLoading}
      value={player}
      onChange={(_, value) => setPlayer(value)}
      onInputChange={(_, value) => handleInputChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          type='string'
          label='Search players'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color='inherit' size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );

  const PlayerCard = (
    <Card>
      <CardContentNoPadding>
        <div className='Player-label'>
          <div>
            <label>
              <Typography variant='overline'>ID:</Typography>
            </label>
            <Typography variant='body1'>{player?.playerId}</Typography>
          </div>
          <div>
            <label>
              <Typography variant='overline'>First Name:</Typography>
            </label>
            <Typography variant='body1'>{player?.firstName}</Typography>
          </div>
          <div>
            <label>
              <Typography variant='overline'>Last Name:</Typography>
            </label>
            <Typography variant='body1'>{player?.lastName}</Typography>
          </div>
          <div>
            <label>
              <Typography variant='overline'>Team:</Typography>
            </label>
            <Typography variant='body1'>{player?.teamId}</Typography>
          </div>
          <div className='options'>
            <IconButton aria-label='delete'>
              <EditIcon />
            </IconButton>
            <IconButton
              color='error'
              aria-label='delete'
              style={{ marginLeft: '5px' }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </CardContentNoPadding>
    </Card>
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h2>🏀 NBA Players</h2>
        </div>
        <div className='Search-box'>{searchBox}</div>
        {player && <div className='Player-card'>{PlayerCard}</div>}
      </header>
    </div>
  );
}

export default App;
