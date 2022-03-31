import PlanningPage from "./PlanningPage";
import ConfigurationMenu from "./ConfigurationMenu";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import React, {useState} from "react";


export default function MainPage(props){

  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');

  const updateNutrition = (calories, carbs, fat, protein) => {
    setCalories(calories);
    setCarbs(carbs);
    setFat(fat);
    setProtein(protein);
  };

  return(
    <Box>
      <Grid container wrap='nowrap' spacing = {2}>
        <Grid item>
          <ConfigurationMenu updateNutrition = {updateNutrition}/>
        </Grid>
        <Grid item>
          <Typography variant='h1'>
            Macro Tracker
          </Typography>
          <PlanningPage
            calories={calories}
            carbs={carbs}
            fat={fat}
            protein={protein}
          />
        </Grid>
      </Grid>

    </Box>
)
}


