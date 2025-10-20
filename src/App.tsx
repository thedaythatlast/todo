import { useState, useRef } from 'react'
import './App.css'

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


function TopBar() {
  
  return (
    <>
    
    </>
  )
}

function Todo() {
  
  return (
    <>
    
    </>
  )
}

function FieldBar() {
  
  return (
    <>
    
    </>
  )
}

function Field() {
  const inputRef = useRef();
  
  const handleClick = () => {
    const text = inputRef.current.value; 
    console.log("User typed:", text);
    return (
      <div>{text}</div>
    )
  };

  return (
    <>
    <div className="flex fixed left-1 bottom-2 w-[80%] h-[40%]" >
      <TextField id="outlined-basic" inputRef={inputRef} variant="outlined" multiline fullWidth
      sx={{
      "& .MuiOutlinedInput-root": {
        alignItems: "flex-start",
        height: "100%",
        color: "#D6FFD8",
        "& fieldset": {
          borderColor: "#D6FFD8", // base color
        },
        "&:hover fieldset": {
          borderColor: "#D6FFD8", // same color on hover
        },
        "&.Mui-focused fieldset": {
          borderColor: "#D6FFD8", // same color on focus
        },
        "&.Mui-error fieldset": {
          borderColor: "#D6FFD8", // prevent red when invalid
        },
      },
    }}
    />
      <Button variant="contained" onClick={handleClick} className="">
        <PlayArrowIcon />
      </Button>
    </div>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <TopBar />
      <Todo />
      <FieldBar />
      <Field />
    </div>
    </>
  )
}

export default App
