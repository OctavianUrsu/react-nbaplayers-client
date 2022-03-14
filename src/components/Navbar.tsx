import Login from './Login';
import Register from './Register';

import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <h2>🏀 NBA Players</h2>
      </div>
      <div className='navbar__credentials'>
        <Login />
        <Register />
      </div>
    </div>
  );
}
