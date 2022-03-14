import Button from '@mui/material/Button';
import Login from './Login';

import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <h2>🏀 NBA Players</h2>
      </div>
      <div className='navbar__credentials'>
        <Login />
        <Button variant='outlined' style={{ marginLeft: '0.5em' }}>
          Register
        </Button>
      </div>
    </div>
  );
}
