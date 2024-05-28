import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<LeaderBoard></LeaderBoard>}/>
      </Routes>
    </div>
  );
}

export default App;
