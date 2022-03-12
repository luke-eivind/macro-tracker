import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './PlanningPage.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import FoodList from './FoodList';
import FoodObject from './FoodObject';

const PlanningPage = (props) => {
  const [foods, setFoods] = useState([]);
  const [inputText, setInputText] = useState('');
  const [foodObjects, setFoodObjects] = useState([]);
  const [macros, setMacros] = useState({
    currentCalories: 0,
    currentCarbs: 0,
    currentProtein: 0,
    currentFat: 0,
    diffCalories: -props.calories,
    diffCarbs: -props.carbs,
    diffProtein: -props.protein,
    diffFat: -props.fat,
  });

  useEffect(() => {
    let calories = 0,
      carbs = 0,
      protein = 0,
      fat = 0;
    foodObjects.forEach((e) => {
      calories += e.totalCalories;
      carbs += e.totalCarbs;
      protein += e.totalProtein;
      fat += e.totalFat;
    });
    let diffCalories = calories - props.calories;
    let diffCarbs = carbs - props.carbs;
    let diffProtein = protein - props.protein;
    let diffFat = fat - props.fat;

    setMacros({
      currentCalories: calories,
      currentCarbs: carbs,
      currentProtein: protein,
      currentFat: fat,
      diffCalories: diffCalories,
      diffCarbs: diffCarbs,
      diffProtein: diffProtein,
      diffFat: diffFat,
    });
  }, [foodObjects]);

  
  const clickAddHandler = async () => {
    const requestUrl =
      'https://api.edamam.com/api/food-database/v2/parser?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66&ingr=' +
      inputText +
      '&nutrition-type=cooking&limit=3';
    let res = await axios.get(requestUrl);
    const img = res.data.parsed[0].food.image;
    const id = res.data.parsed[0].food.foodId;
    axios
      .post(
        'https://api.edamam.com/api/food-database/v2/nutrients?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66',
        {
          ingredients: [
            {
              quantity: 1,
              measureURI:
                'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
              foodId: res.data.parsed[0].food.foodId,
            },
          ],
        }
      )
      .then(function (res) {
        setFoodObjects((prevFoods) => {
          let newFoodObject = new FoodObject(
            res.data.totalNutrients.ENERC_KCAL.quantity,
            res.data.totalNutrients.CHOCDF.quantity,
            res.data.totalNutrients.FAT.quantity,
            res.data.totalNutrients.PROCNT.quantity,
            100,
            res.data.ingredients[0].parsed[0].food.toLowerCase(),
            id,
            img,
            clickDeleteHandler,
            updateQuantityHandler
          );
          return [...prevFoods, newFoodObject];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clickCalculateHandler = async () => {
    let tempFoodObjects = [];

    foodObjects.forEach((e) => {
      tempFoodObjects.push({
        carbs: e.carbs,
        protein: e.protein,
        fat: e.fat,
        id: e.id,
        quantity: 0,
        serving: 999,
      });
    });

    let sum = 0; //sum of serving sizes (grams) for all foods

    await Promise.all(
      tempFoodObjects.map(async (e) => {
        await axios
          .post(
            'https://api.edamam.com/api/food-database/v2/nutrients?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66',
            {
              ingredients: [
                {
                  quantity: 1,
                  measureURI:
                    'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
                  foodId: e.id,
                },
              ],
            }
          )
          .then((res) => {
            if (
              res.data.ingredients[0].parsed[0].status === 'MISSING_QUANTITY'
            ) {
              console.log('no serving');
              e.serving = 100;
              sum += 100;
            } else {
              console.log('serving');
              e.serving = res.data.totalWeight;
              sum += res.data.totalWeight;
            }
          });
        return e;
      })
    );

    tempFoodObjects.map((e) => {
      e.serving = e.serving / sum;
      return e;
    });

    let carbs = 0,
      protein = 0,
      fat = 0;

    while (carbs < props.carbs || protein < props.protein || fat < props.fat) {

      tempFoodObjects.map((e) => {
        carbs += e.carbs * e.serving;
        protein += e.protein * e.serving;
        fat += e.fat * e.serving;
        e.quantity += e.serving;
        return e
      });

      let carbsCompleted = carbs / props.carbs
      let proteinCompleted = protein / props.protein
      let fatCompleted = fat / props.fat

      if((carbsCompleted >= .9 || proteinCompleted >= .9 || fatCompleted >= .9) && (carbsCompleted <= .7 || proteinCompleted <= .7 || fatCompleted <= .7)){
        
      }

    }

    setFoodObjects((prevObjects) => {
      return prevObjects.map((e, i) => {
        e.quantity = tempFoodObjects[i].quantity
        return e;
      });
    });
  };

  //handler for clicking the delete button on a food row.  This function reference is passed as a prop to the food component
  const clickDeleteHandler = (foodName) => {
    setFoodObjects((prevComponents) => {
      return prevComponents.filter((c) => {
        return c.component.props.name !== foodName;
      });
    });
  };

  const updateQuantityHandler = (foodName, quantity) => {
    setFoodObjects((prevObjects) => {
      return prevObjects.map((e) => {
        if (e.name === foodName) {
          e.quantity = quantity;
        }
        return e;
      });
    });
  };

  //handler that gets called every time the content of the food input box is changed.  Calls the autocomplete api.
  const foodInputHandler = async (event) => {
    setInputText(event.target.value);
    const requestUrl =
      'https://api.edamam.com/auto-complete?app_id=f5b1ce0c&app_key=7920e032acb60d629d1c3fe8bc4b19c7&q=' +
      event.target.value +
      '&limit=3';
    const res = await axios.get(requestUrl);

    const counter = 1;
    let functionFoods = [];
    res.data.forEach((e) => {
      let food = { id: counter, name: e };
      functionFoods.push(food);
    });
    setFoods(functionFoods);
  };

  const autoCompleteHandler = (event, value) => {
    setInputText(value.name);
  };

  return (
    <div>
      <h1>PlanningPage</h1>
      <nav style={{ margin: '2rem' }}>
        <Link to='/'>Landing</Link>
      </nav>
      <div
        className='input-box card'
        style={{ background: 'white', padding: '2rem' }}
      >
        <Autocomplete
          id='foods-autocomplete'
          onChange={autoCompleteHandler}
          options={foods}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Foods'
              letiant='outlined'
              onChange={foodInputHandler}
            />
          )}
          getOptionLabel={(option) => option.name}
          style={{ width: 270 }}
        />
        <Button
          style={{ margin: '10px auto', padding: '2rem' }}
          onClick={clickAddHandler}
        >
          Add
        </Button>
        <Button
          style={{ margin: '10px auto', padding: '2rem' }}
          onClick={clickCalculateHandler}
        >
          Calculate
        </Button>
      </div>
      <FoodList components={foodObjects.map((c) => c.component)}></FoodList>
      <div className='card' style={{ padding: '2rem' }}>
        <b>Current:</b> &nbsp;&nbsp;&nbsp;
        <b>Calories:</b> &nbsp;{macros.currentCalories.toFixed(2)}&nbsp;&nbsp;
        <b>Protien:</b> &nbsp;{macros.currentProtein.toFixed(2)}&nbsp;&nbsp;
        <b>Carbs:</b> &nbsp;{macros.currentCarbs.toFixed(2)}&nbsp;&nbsp;
        <b>Fat:</b> &nbsp;{macros.currentFat.toFixed(2)}&nbsp;&nbsp;
        <br />
        <b>&nbsp;Target:</b>&nbsp;&nbsp;&nbsp;
        <b>&nbsp;Calories:</b> &nbsp;{props.calories}&nbsp;&nbsp;
        <b>Protien:</b> &nbsp;{props.protein}&nbsp;&nbsp;
        <b>Carbs:</b> &nbsp;{props.carbs}&nbsp;&nbsp;
        <b>Fat:</b> &nbsp;{props.fat}&nbsp;&nbsp;
        <br />
        <b>
          ____________________________________________________________________________________________
        </b>
        <br />
        <b>&nbsp;Diff:</b>&nbsp;&nbsp;&nbsp;
        <b>&nbsp;Calories:</b> &nbsp;{macros.diffCalories.toFixed(2)}
        &nbsp;&nbsp;
        <b>Protien:</b> &nbsp;{macros.diffProtein.toFixed(2)}&nbsp;&nbsp;
        <b>Carbs:</b> &nbsp;{macros.diffCarbs.toFixed(2)}&nbsp;&nbsp;
        <b>Fat:</b> &nbsp;{macros.diffFat.toFixed(2)}&nbsp;&nbsp;
        <br />
      </div>
    </div>
  );
};

export default PlanningPage;
