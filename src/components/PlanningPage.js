import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./PlanningPage.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Food from "./Food"; //may not need this here now since food component is only referenced in FoodObject.js
import axios from "axios";
import FoodList from "./FoodList";
import FoodObject from "./FoodObject";

const PlanningPage = (props) => {
  const [foods, setFoods] = useState([]);
  const [inputText, setInputText] = useState("");
  const [foodObjects, setFoodObjects] = useState([]);



  //handler for clicking the add button on the planning page
  const clickAddHandler = async () => {
    const requestUrl =
      "https://api.edamam.com/api/food-database/v2/parser?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66&ingr=" +
      inputText +
      "&nutrition-type=cooking&limit=3";
    let res = await axios.get(requestUrl);
    const img = res.data.parsed[0].food.image;
    axios
      .post(
        "https://api.edamam.com/api/food-database/v2/nutrients?app_id=b295d5ab&app_key=423589a8b37bf61dcb13f405c1fb5e66",
        {
          ingredients: [
            {
              quantity: 1,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: res.data.parsed[0].food.foodId,
            },
          ],
        }
      )
      .then(function (res) {
        setFoodObjects((prevFoods) => {
          var newFoodObject = new FoodObject(res.data.totalNutrients.ENERC_KCAL.quantity, res.data.totalNutrients.CHOCDF.quantity, res.data.totalNutrients.FAT.quantity, res.data.totalNutrients.PROCNT.quantity, 100)
          newFoodObject.setComponent(res.data.ingredients[0].parsed[0].food.toLowerCase(), img, clickDeleteHandler)
          return [...prevFoods, newFoodObject];
        });
        
      })
      .catch(function (error) {
        console.log(error);
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

  //handler that gets called every time the content of the food input box is changed.  Calls the autocomplete api.
  const foodInputHandler = async (event) => {
    setInputText(event.target.value);
    const requestUrl =
      "https://api.edamam.com/auto-complete?app_id=f5b1ce0c&app_key=7920e032acb60d629d1c3fe8bc4b19c7&q=" +
      event.target.value +
      "&limit=3";
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
      <nav style={{margin:'2rem'}}>
        <Link to="/">Landing</Link>
      </nav>
      <div
        className="input-box card"
        style={{ background: "white", padding: "2rem" }}
      >
        <Autocomplete
          id="foods-autocomplete"
          onChange={autoCompleteHandler}
          options={foods}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Foods"
              variant="outlined"
              onChange={foodInputHandler}
            />
          )}
          getOptionLabel={(option) => option.name}
          style={{ width: 270 }}
        />
        <Button
          style={{ margin: "10px auto", padding: "2rem" }}
          onClick={clickAddHandler}
        >
          Add
        </Button>
      </div>
      <FoodList components={foodObjects.map((c) => c.component) }></FoodList>
      <div className="card" style={{ padding: "2rem" }}>
        <b>Calories:</b> &nbsp;{props.calories}&nbsp;&nbsp;
        <b>Protien:</b> &nbsp;{props.protein}&nbsp;&nbsp;
        <b>Carbs:</b> &nbsp;{props.carbs}&nbsp;&nbsp;
        <b>Fat:</b> &nbsp;{props.fat}&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default PlanningPage;
