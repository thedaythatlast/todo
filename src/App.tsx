import { useState, useRef, useEffect, useCallback} from 'react'
import './App.css'

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
  const inputRef = useRef(); // to beam input to the screen (or html)
  const todoRef = useRef(); // to make sure the todo is always scrolled to bottom
  
  const [todo, setTodo] = useState([]); // beam the data to the variable 'todo', which in turn beam to the html
  const [count, setCount] = useState(0); // id for each todo line
  const [todoPressed, setTodoPressed] = useState(0); // state for whether a todo line is pressed or not

  const LineButton = "<div>nigger</div>"; // button chocies for each line

  // --- VVV this is to load data from localstorage VVV ---
  useEffect(() => {
    const loadTodo = JSON.parse(localStorage.getItem('todo'));
    if (loadTodo == null) return;
    if (loadTodo.length != 0) setTodo(loadTodo);
  },[]);
  
  // --- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ---


  // beam data to the screen whenver the button clicked
  const handleClick = useCallback(() => {
    if (inputRef.current?.value === "") return;
    setTodo((prev) => [...prev, {id: count, color:"text-red-500", text: inputRef.current?.value}]);
    setCount(prev => prev + 1);
  }, [count]);

  const LinePressed = () => {
    setTodoPressed(1);
  };

  useEffect(() => {
    // scroll bottom whenever a new thing added
    if (todoRef.current) {
      todoRef.current.scrollTop = todoRef.current.scrollHeight;
      inputRef.current.value = "";
    } 

    // save data to localstorage whenever a new thing added
    localStorage.setItem('todo', JSON.stringify(todo));
    console.log(localStorage);

  }, [todo]);

  // event handling for pressing enter on keyboard
  useEffect(() => {
    const detectButton = (e) => { 
      if (e.key === "Enter") handleClick()
      else if (e.key.length === 1) inputRef.current.focus();
    };

    window.addEventListener("keydown", detectButton);

    return () => window.removeEventListener("keydown", detectButton);
  }, [handleClick]); 

  // html UI, enough said
  return (
    <>
    <div className="fixed top-1 left-1 h-[90dvh] overflow-y-auto w-[100%] text-[28px]" ref={todoRef}>
    TODO:
    { 
      todo.map((item) => (
      <div 
        className="flex items-start text-left text-red-500 wrap-anywhere 
        hover:bg-[#414D62] focus:bg-[#414D62] active:shadow-inner
        text-[24px]
        " 
        key={item.id} onClick={LinePressed}
        tabIndex={0}>
        - {item.text}

        {todoPressed ? LineButton : null}
      </div>
      ))
    }
    </div>

    <div className="flex fixed left-1 bottom-2 right-1 h-[8.2dvh]" >
      <input ref={inputRef} type="text" 
        className="w-full h-full text-[#D6FFD8] border-2 border-[#D6FFD8] rounded-md bg-transparent px-2 box-border outline-none focus:border-[#D6FFD8]"/>
      <Button variant="contained" onClick={handleClick} className="">
        <PlayArrowIcon />
      </Button>
    </div>
    </>
  )
}

function App() {

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
