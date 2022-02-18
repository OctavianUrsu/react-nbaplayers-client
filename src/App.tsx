import React, { useEffect, useState } from 'react';
import './App.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { debounce } from 'lodash';

interface Player {
  playerId: string;
  firstName: string;
  lastName: string;
  teamId: number;
}

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

function App() {
  //
  const [inputValue, setInputValue] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  //
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

        console.log('calling api for ', inputValue);

        setPlayers(players);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }, 500)
  ).current;

  // Call the search function on input change
  const onInputChangeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.value === undefined || target.value === null) {
      target.value = '';
    } else {
      setInputValue(target.value);

      if (target.value.length > 2) {
        setOpen(true);
        debouncedSearch(target.value);
        console.log('calling debouncer for', target.value);
      }
    }
  };

  // Handle the onClose event
  const handleOnClose = () => {
    setOpen(false);
    setPlayers([]);
    setInputValue('');
  };

  const searchBox = (
    <Autocomplete
      id='player-search'
      filterOptions={(x) => x}
      open={open}
      onClose={handleOnClose}
      getOptionLabel={(player) => player.firstName + ' ' + player.lastName}
      options={players}
      isOptionEqualToValue={(o, v) => o.playerId === v.playerId}
      loading={isLoading}
      defaultValue={null}
      value={player}
      onChange={(_, value) => setPlayer(value)}
      onInputChange={onInputChangeHandler}
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
      <CardContent>
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
        </div>
      </CardContent>
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
