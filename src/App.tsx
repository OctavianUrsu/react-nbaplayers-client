import { useEffect, useState } from 'react';
import './App.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Player {
  playerId: string;
  firstName: string;
  lastName: string;
  teamId: number;
}

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

const usePlayers = (): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);

  const getPlayers = async () => {
    const res = await fetch(`${BASE_URL}/api/players/`);
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return players;
};

function App() {
  const players = usePlayers();

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h2>🏀 NBA Players</h2>
        </div>
        <div className='Search-box'>
          <Autocomplete
            options={players}
            sx={{ width: 700 }}
            renderInput={(params) => (
              <TextField {...params} label='Search players' />
            )}
            getOptionLabel={(option) =>
              option.firstName + ' ' + option.lastName
            }
          />
        </div>
      </header>
    </div>
  );
}

export default App;
