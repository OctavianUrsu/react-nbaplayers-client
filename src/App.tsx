import './App.css';

import Searchbar from './components/Searchbar';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h2>🏀 NBA Players</h2>
        </div>
        <Searchbar />
      </header>
    </div>
  );
}

export default App;
