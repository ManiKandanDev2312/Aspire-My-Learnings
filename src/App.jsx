import { useState } from 'react'
import './App.css'


function App() {
  const [count,setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }
  return (
    <>
    <MyButton  count = {count} onClick = {handleClick} />
    <MyButton count = {count} onClick = {handleClick} />
    </>
  )
}

function MyButton({count,onClick}){
  return(
    <>
    <h1>count : {count}</h1>
    <button onClick={onClick}>Increment</button>
    </>
  )
}

// function MyButton(){
//   const [count , setCount] = useState(0);

//   function handleClick(){
//     setCount(count + 1);
//   }

//   return (
//     <>
//     <h1>count : {count}</h1>
//     <button onClick = {handleClick}>Increment</button>
//     </>
//   )
// }

export default App
