import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import './App.css'
import Question from './Question'

export default function App() {
  const [questions, setQuestions] = useState([])

  function startGame(){
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }

  const questionsElements = questions.map(question => (
    <Question 
      key={nanoid()}
      value={JSON.stringify(question.question)}
      incorrect_answers={question.incorrect_answers}
      correct_answer={question.correct_answer}

    />
    
  ))

  return (
    <main>
      {
      questions.length > 0 ? 
      <div>
        {questionsElements}
      </div> : 
      <div className='no-notes'>
        <h1 className='no-notes-title'>Quizzical</h1>
        <p className='no-notes-text'>Some description if needed</p>
        <button className='no-notes-btn' onClick={startGame}>Start quiz</button>
      </div>
      }
    </main>
    
  )

}

