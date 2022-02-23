import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
//import { foods } from './foods'
import axios from 'axios'

const PlanningPage = () => {

  const [foods, setFoods] = useState([])

  const foodInputHandler = async (event) => {
    console.log(event.target.value)
    //const res = await axios.get(`https://api.edamam.com/auto-complete?app_id=f5b1ce0c&app_key=7920e032acb60d629d1c3fe8bc4b19c7&q=e&limit=3`);
    const urlBase = 'https://api.edamam.com/auto-complete?app_id=f5b1ce0c&app_key=7920e032acb60d629d1c3fe8bc4b19c7&q=' + event.target.value + '&limit=3'
    const res = await axios.get(urlBase)
    console.log(res.data)
    const counter = 1
    let functionFoods = []
    console.log(counter)
    res.data.forEach(e => {
      let item = {id: counter, name: e}
      functionFoods.push(item)
    })
    setFoods(functionFoods);

    // console.log(urlBase)
    // axios({
    //   method: 'get',
    //   url: urlBase,
    // })
  }

  return (
    <div>
      <h1>PlanningPage</h1>
      <nav>
        <Link to='/'>Landing</Link>
      </nav>
      <Autocomplete
          id="foods"
          options={foods}
          renderInput={params => (
              <TextField {...params} label="Foods" variant="outlined" onChange={foodInputHandler}/>
          )}
          getOptionLabel={option => option.name}
          style={{ width: 270 }}
      />
    </div>
  );
};

export default PlanningPage;
