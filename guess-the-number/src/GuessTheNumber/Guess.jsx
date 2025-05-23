import React, { useEffect, useState } from 'react'
import './Guess.css';
function Guess() {
    const [message,setMessage]=useState('');
    const [guess,setGuess]=useState('');
    const [random,setRandom]=useState(()=>Math.floor(Math.random()*10));
    const [array,setArray]=useState([]);
    const [gameOver,setGameover]=useState(false);
    const [gameStarted,setGameStarted]=useState(false);

    const handleSubmit=(e)=>{
        if(array.length>=5){
            setMessage(`You lost! ❌ Answer was: ${random}`);
            setGameover(true);
            return;
        }
            e.preventDefault();

            setArray(prev=>[...prev,guess]);

        if(guess.trim()!==''){
          setGuess('');
        }

        if(guess=="0"){
            return;
        }

        
        // const num=Math.floor(Math.random()*10);
        const userGuess=parseInt(guess);

        if(userGuess==random){
          setMessage("Congrats🎉");
          setGameStarted(false);
        }
        else if(userGuess<random){
            setMessage("Too Low📉");
        }
        else{
            setMessage("too high📈");
        }
        
         console.log(`Random: ${random}, your guess: ${userGuess}`);
       
        
        
    }
    
    const handleStart=()=>{
        setGameStarted(true);
        setGameover(false);
        setArray([]);
        setMessage("");
        setRandom(Math.floor(Math.random()*10));
    }

    const handleKeyDown=(e)=>{
      if(e.key==='Enter'){
        handleSubmit(e);
      }
    }
   
  return (
    <div className='main'>
        <h3>Enter a guess between 0 to 10</h3>
        <form onSubmit={handleSubmit} className="container">
            <input onChange={(e)=>setGuess(e.target.value)} 
                   onKeyDown={handleKeyDown} value={guess} 
                   disabled={!gameStarted || gameOver}
                   type='number' placeholder='Guess Number'/>
            <div className="btns">
                <button type='submit'
                disabled={!gameStarted || gameOver} 
                className=' btn submit'>submit</button>
            <button onClick={handleStart} className="btn start">start</button>
            </div>

            
            
        </form>
      <h3>{message}</h3>
      <h3 className="guesses">
        Your Guesses
        {array.map((item,index)=>(
            <p key={index}>{item}</p>
        ))}
        
      </h3>
      
    </div>
  )
}

export default Guess
