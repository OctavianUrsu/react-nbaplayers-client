import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './PlayerCard.module.css';

import { Player } from '../types/types';

type PlayerCardProps = {
  player: Player;
  team: string;
};

export default function PlayerCard(props: PlayerCardProps) {
  const CardContentNoPadding = styled(CardContent)(`
  padding: 16px;
  &:last-child {
    padding-bottom: 16px;
  }
`);

  const { player, team } = props;

  return (
    <Card className={styles.card}>
      <CardContentNoPadding>
        <div className={styles.card__label}>
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
            <Typography variant='body1'>{team}</Typography>
          </div>
          <div className={styles.card__options}>
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
}
