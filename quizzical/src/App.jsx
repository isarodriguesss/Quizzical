import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import './App.css'
import Question from './Question'
import shuffleArray from "./utils";

export default function App() {
  const [questions, setQuestions] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState()

  function startGame(){
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => setQuestions(formatQuizData(data.results)))
  }

  function formatQuizData(questionsArray) {
    let formattedData = questionsArray.map((item) => {
      return {
        id: nanoid(),
        question: item.question,
        correctAnswer: item.correct_answer,
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
        score: 0,
      }
    })

    return formattedData;
  }

  const questionsElements = questions.map(question => (
    <Question 
      key={nanoid()}
      question={question.question}
      answers={question.answers}
      correct_answer={question.correctAnswer}
      score={question.score}


    />
    
  ))
  
  function checkAnswers() {

  }

  return (
    <main>
      {
      questions.length > 0 ? 
      <div>
        {questionsElements}
        <button className='check-answers' onClick={checkAnswers}>Check answers</button>
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