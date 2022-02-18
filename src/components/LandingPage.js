import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


export default function LandingPage() {
    const[calories, setCalories] = useState('')
    const[carbs, setCarbs] = useState('')
    const[fat, setFat] = useState('')
    const[protein, setProtein] = useState('')
    const[inputText, setInputText] = useState('')
    
    useEffect(()=>{console.log(inputText)}, [inputText])

    const changeCaloriesHandler = (event) => {
        setCalories(event.target.value)
        setInputText(event.target.value)
    }

    
    const changeCarbsHandler = (event) => {
        setCarbs(event.target.value)
        setInputText(event.target.value)

        // setCarbs((prevState)=>{
        //     return event.target.value
        // })
        // this.setState
        // console.log(carbs)
        
            // this.setState({
            //     number: num
            // }, function () {
            //     console.log(this.state.number);
            // });
    }

    const changeFatHandler = (event) => {
        setFat(event.target.value)
        setInputText(event.target.value)

    }

    const changeProteinHandler = (event) => {
        setProtein(event.target.value)
        setInputText(event.target.value)
    }

    return(
        <div>
            <h1>
                Enter In Your Target Calories And Macros
            </h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="calories-input" label="Calories" variant="outlined" onChange={changeCaloriesHandler}/>
                </div>
                <div>
                    <TextField id="carbs-input" label="Carbs" variant="outlined" onChange={changeCarbsHandler}/>
                </div>
                <div>
                    <TextField id="fat-input" label="Fat" variant="outlined" onChange={changeFatHandler}/>
                </div>
                <div>
                    <TextField id="protein-input" label="Protein" variant="outlined" onChange={changeProteinHandler}/>
                </div>

            </Box>
            <Button>
                
            </Button>
        </div>
    )
}
