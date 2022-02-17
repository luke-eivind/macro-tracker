import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'


export default function LandingPage() {
    const[calories, setCalories] = useState('')
    const[carbs, setCarbs] = useState('')
    const[fat, setFat] = useState('')
    const[protein, setProtein] = useState('')
    const[meme, setMeme] = useState('')
    
    useEffect(()=>{console.log(meme)}, [meme])

    const changeCalories = (event) => {
        setCalories(event.target.value)
        setMeme(event.target.value)
    }

    
    const changeCarbs = (event) => {
        setCarbs(event.target.value)
        setMeme(event.target.value)

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

    const changeFat = (event) => {
        setFat(event.target.value)
        setMeme(event.target.value)

    }

    const changeProtein = (event) => {
        setProtein(event.target.value)
        setMeme(event.target.value)
    }

    return(
    <form>
        <label>Calories</label>
        <input type='text' onChange={changeCalories}></input>
        <input type='submit'></input>
        {/*<TextField id="calories-input" label="Calories" variant="outlined" />
                <TextField id="carbs-input" label="Carbs" variant="outlined" />
                <TextField id="fat-input" label="Fat" variant="outlined" />
                <TextField id="protein-input" label="Protein" variant="outlined" />*/}

        <label>Carbs</label>
        <input type='text' onChange={changeCarbs}></input>
        <input type='submit'></input>
        <label>Fat</label>
        <input type='text' onChange={changeFat}></input>
        <input type='submit'></input>
        <label>Protein</label>
        <input type='text' onChange={changeProtein}></input>
        <input type='submit'></input>
    </form>
            // <Box
            //     component="form"
            //     sx={{
            //         '& > :not(style)': { m: 1, width: '25ch' },
            //     }}
            //     noValidate
            //     autoComplete="off"
            // >

            // </Box>
    )
}
