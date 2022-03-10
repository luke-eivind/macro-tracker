import '../App.css';
import LandingPage from './LandingPage';
import PlanningPage from './PlanningPage';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');

  const clickNextHandler = (calories, carbs, fat, protein) => {
    setCalories(calories);
    setCarbs(carbs);
    setFat(fat);
    setProtein(protein);
  };

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<LandingPage clickNextHandler={clickNextHandler} />}
        />
        <Route
          path='plan'
          element={
            <PlanningPage
              calories={calories}
              carbs={carbs}
              fat={fat}
              protein={protein}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
