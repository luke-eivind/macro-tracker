import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function ConfigurationMenu(props){

  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('10');
  const [fat, setFat] = useState('10');
  const [protein, setProtein] = useState('10');
  const [inputText, setInputText] = useState('');
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    props.updateNutrition(calories, carbs, fat, protein)
  })

  const changeHandler = (event, changeFunction) => {
    changeFunction(event.target.value)
  }

  const autoCompleteHandler = (event, value) => {
    setInputText(value.name);
  };

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

  return(
    <Box sx={{bgcolor: '#EDF2F4', width: '20rem', height: '100%'}}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>Set Macros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <TextField sx={{margin: '.5rem'}} label='Calories' onChange={(e) => changeHandler(e, setCalories)}>
              Calories
            </TextField>
            <TextField sx={{margin: '.5rem'}} label='Protein' onChange={(e) => changeHandler(e, setProtein)}>
              Protein
            </TextField>
            <TextField sx={{margin: '.5rem'}} label='Carbs' onChange={(e) => changeHandler(e, setCarbs)}>
              Carbs
            </TextField>
            <TextField sx={{margin: '.5rem'}} label='Fat'onChange={(e) => changeHandler(e, setFat)}>
              Fat
            </TextField>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>Add Foods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            id='foods-autocomplete'
            className='auto'
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
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}