import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import PlayerCard from './PlayerCard';
import { Player, Team } from '../types/types';

import styles from './Searchbar.module.css';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

function Searchbar() {
  // State for found players and selected player
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  // State for found teams
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<string>('');

  // Autocomplete states for search results opening and loading
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search and call to API
  const debouncedSearch = React.useRef(
    debounce(async (inputValue: string) => {
      setIsLoading(true);
      axios
        .get<Player[]>(`${BASE_URL}/api/players/search?name=${inputValue}`)
        .then((res) => {
          setPlayers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }, 500)
  ).current;

  // Handle Autocomplete input change
  const handleInputChange = (value: string) => {
    if (value.length > 2) {
      debouncedSearch(value);
    }
  };

  // Find team of selected player
  const findTeam = (id: number) => {
    for (let i = 0, l = teams.length; i < l; i++) {
      if (teams[i].teamId === id) {
        setTeam(teams[i].name);
      }
    }
  };

  useEffect(() => {
    axios
      .get<Team[]>(`${BASE_URL}/api/teams`)
      .then((res) => setTeams(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!open) {
      setPlayers([]);
    }
  }, [open]);

  return (
    <>
      <div className={styles.searchbar}>
        <Autocomplete
          id='player-search'
          forcePopupIcon={false}
          filterOptions={(x) => x}
          open={open}
          onOpen={(e) =>
            (e.target as HTMLInputElement).value.length > 2 && setOpen(true)
          }
          onClose={() => {
            setPlayers([]);
            setOpen(false);
          }}
          options={players}
          getOptionLabel={(player) => player.firstName + ' ' + player.lastName}
          isOptionEqualToValue={(o, v) => o.playerId === v.playerId}
          loading={isLoading}
          value={player}
          onChange={(_, value) => {
            setPlayer(value);
            value?.teamId != null && findTeam(value.teamId);
          }}
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
      </div>
      {player && <PlayerCard player={player} team={team} />}
    </>
  );
}

export default Searchbar;
