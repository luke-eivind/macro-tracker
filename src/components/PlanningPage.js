import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './PlanningPage.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Food from './Food';
import axios from 'axios';
import FoodList from './FoodList';

const PlanningPage = () => {
  const [foods, setFoods] = useState([]);
  const [inputText, setInputText] = useState('');
  const [foodComponents, setFoodComponents] = useState([]);
  const [foodQuantities, setFoodQuantities] = useState([]);

  
  

  const buttonClickHandler = async () => {
    const requestUrl =
      'https://api.edamam.com/api/food-database/v2/parser?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66&ingr=' +
      inputText +
      '&nutrition-type=cooking&limit=3';
    let res = await axios.get(requestUrl);
    const img = res.data.parsed[0].food.image;
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
        setFoodComponents((prevFoods) => {
          return [
            ...prevFoods,
            <Food
              img={img}
              name={res.data.ingredients[0].parsed[0].food.toLowerCase()}
              calories={res.data.totalNutrients.ENERC_KCAL.quantity}
              protein={res.data.totalNutrients.PROCNT.quantity}
              carbs={res.data.totalNutrients.CHOCDF.quantity}
              fat={res.data.totalNutrients.FAT.quantity}
              deleteHandler={clickDeleteHandler}
            ></Food>,
          ];
        });
        setFoodQuantities((prevQuantities) => {
          return [...prevQuantities, {name: res.data.ingredients[0].parsed[0].food.toLowerCase(), quantity: 100 }]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clickDeleteHandler = (foodName) => {
    setFoodComponents((prevComponents) =>{
      return prevComponents.filter((component) => {
        return component.props.name !== foodName;
      })
    }
    );
    setFoodQuantities((prevQuantities) => {
     return prevQuantities.filter((quantity) => {
        return quantity.name !== foodName;
      })
    })
  }

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
      let item = { id: counter, name: e };
      functionFoods.push(item);
    });
    setFoods(functionFoods);
  };

  const autoCompleteHandler = (event, value) => {
    setInputText(value.name);
  };

  return (
    <div>
      <h1>PlanningPage</h1>
      <div
        className='input-box card'
        style={{ background: 'white', padding: '2rem' }}
      >
        <nav>
          <Link to='/'>Landing</Link>
        </nav>
        <Autocomplete
          id='foods-autocomplete'
          onChange={autoCompleteHandler}
          options={foods}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Foods'
              variant='outlined'
              onChange={foodInputHandler}
            />
          )}
          getOptionLabel={(option) => option.name}
          style={{ width: 270 }}
        />
        <Button
          style={{ margin: '10px auto', padding: '2rem' }}
          onClick={buttonClickHandler}
        >
          Add
        </Button>
      </div>
      <FoodList components={foodComponents}></FoodList>
    </div>
  );
};

export default PlanningPage;
