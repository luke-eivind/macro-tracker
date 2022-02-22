import '../App.css';
import LandingPage from './LandingPage';
import PlanningPage from './PlanningPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='plan' element={<PlanningPage />} />
      </Routes>
    </div>
  );
}

export default App;
