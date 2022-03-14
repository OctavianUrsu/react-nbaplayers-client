import './App.css';

import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar';

function App() {
  return (
    <div className='App'>
      <header>
        <Navbar />
        <Searchbar />
      </header>
    </div>
  );
}

export default App;
