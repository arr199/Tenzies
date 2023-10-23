/* eslint-disable react-hooks/exhaustive-deps */
import React  from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import './style.css'
import Confetti from "react-confetti"

/*  CALCULATE ELAPSED TIME AND CONVERT TO SECONDS/MINUTES */
function showElapsedTime(time) {
    
    const seconds = time
    if (seconds < 60) {
        return `${(seconds).toFixed()} seconds`
    } 
    else  {
        return `${(seconds/60).toFixed()} minute${(seconds/60).toFixed() >= 2 ? "s" : ""} and ${(seconds%60).toFixed()} seconds`
    }
}

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [winner, setWinner] = React.useState(false)
    const [darkMode,setDarkMode] = React.useState(false)
    const [startTime,setStartTime] = React.useState(Date.now())
    
    React.useEffect( () => {
        if (winner) return

        showElapsedTime

    },[winner])
    
    React.useEffect( () => {
        
        if  (winner) return
        if (dice.every( (e) => e.value === dice[0].value && e.isHeld ===  true))
        {
            setStartTime((startTime) => (Date.now() - startTime )/1000)
            setWinner(!winner)  
                
        }
   
    },[dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if (winner) {
            setDice(allNewDice)
            setWinner(!winner)
            setStartTime(Date.now())
            
        }
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    }
    
    function holdDice(id) {
        if (winner) return
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
           
        />
    ))
    
    return (
        <main className={ darkMode ? "darkmode" : ""}>
            <div onClick={ () =>  setDarkMode(!darkMode)  } className="darkmode-div">
                <div className="darkmode-btn"></div>
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{winner ? "New Game" : "Roll" }</button>
            { winner && <Confetti></Confetti>}
         {winner && <p>Took you {showElapsedTime(startTime)} to win</p>}
        </main>
        
    )
}