import { useState, useRef, useEffect} from 'react'
import './App.css'

// MUI

import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';

// libraries so i can add some drag and drop


function Field() {
  const inputRef = useRef(''); // to beam input to the screen (or html)
  const todoRef = useRef(''); // to make sure the todo is always scrolled to bottom
  
  const [todo, setTodo] = useState([]); // beam the data to the variable 'todo', which in turn beam to the html
  //const [count, setCount] = useState(0); // id for each todo line
  const [todoPressed, setTodoPressed] = useState(-1); // state for whether a todo line is pressed or not
  const colorVarDefault = "text-[#D6FFD8]"; // default color for each submitted text

  // 3 colors buttons
  // button for deleting
  const LineButton = (TargetID) => (
    <div className="absolute content-center bottom-[100%] z-1">
      <div className="flex gap-1">
        <Button
          variant="contained" 
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: colorVarDefault } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }}
          
        > 
        Green
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: 'text-red-500' } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }}
          
        > 
        Red
        </Button>

        <Button 
          variant="contained" 
          color="warning"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.map(NewTodo => 
              NewTodo.id === TargetID
              ? { ...NewTodo, color: 'text-yellow-500' } 
              : NewTodo
              ));
            setTodoPressed(-1);
          }} 
        > 
        Golden
        </Button>
        <Button 
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setTodo((prev) => prev.filter(NewTodo => NewTodo.id !== TargetID));
            setTodoPressed(-1);
          }}
          sx = {{backgroundColor: ''}}
          aria-label="delete" color="info"
        > 
          <DeleteIcon />
          Delete
        </Button>
      </div>
    </div>
  );

  // --- VVV this is to load data from localstorage VVV ---
  useEffect(() => {
    const loadTodo = JSON.parse(localStorage.getItem('todo'));
    if (loadTodo == null) return;
    if (loadTodo.length != 0) setTodo(loadTodo);
  },[]);
  
  // --- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ---


  // beam data to the screen whenver the button clicked
  const handleClick = () => {
    if (inputRef.current?.value === "") return;
    setTodo((prev) => [...prev, {id: Date.now(), color: colorVarDefault, text: inputRef.current?.value}]);
    //setCount(prev => prev + 1);
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

  const LinePressed = (id_of_line) => {
      setTodoPressed(id_of_line);
    };

  // event handling for pressing enter on keyboard
  useEffect(() => {
    const detectKeyBoardButton = (e) => { 
      // ignore metakeys (like ctrl)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") handleClick(); // submit button when pressed 'enter'
      else if (e.key.length === 1) inputRef.current.focus(); // input field focused when press any key at all
    };

    const detectMouseButton = (e) => { 
      if (e.target.closest('button')) return;
      setTodoPressed(-1);
    };

    window.addEventListener("keydown", detectKeyBoardButton);
    window.addEventListener("mousedown", detectMouseButton);
    

    return () => {
      window.removeEventListener("keydown", detectKeyBoardButton);
      window.removeEventListener("mousedown", detectMouseButton);
      
    }
  }, [handleClick]); 

  // html UI, enough said
  return (
    <>
    <div className="fixed top-1 left-1 text-left h-[90dvh] overflow-y-auto w-[100%] text-[28px]" ref={todoRef}>
    TODO:
    { 
      todo.map((item) => (
      <div 
        className={`relative flex items-start ${item.color}
        wrap-anywhere text-pretty
        hover:bg-[#414D62] focus:bg-[#414D62] active:shadow-inner
        text-[24px]
        `} 
        key={item.id} onClick={() => LinePressed(item.id)}
        tabIndex={0}>
        - {item.text}

        {todoPressed == item.id ? LineButton(item.id) : null}
      </div>
      ))
    }
    </div>

    <div className="flex fixed left-1 bottom-2 right-1 h-[8.2dvh]" >
      <input ref={inputRef} type="text" 
        className="w-full h-full 
        text-[#D6FFD8] 
        border-2 border-[#D6FFD8] rounded-md bg-transparent px-2 box-border outline-none focus:border-[#D6FFD8]"/>
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
      <Field />
    </div>
    </>
  )
}

export default App
