import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import './App.css'
import Question from './Question'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState()

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=10")
      const data = await res.json()
      let q = []
      data.results.forEach(question => {
        q.push({
          id: nanoid(),
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          question: question.question,
          correct: question.correct_answer,
          selected: null,
          checked: false
        })
      })
      setQuestions(q)
    }
    getQuestion()
  },[count])

  
  function start(){
    setStarted(x => !x)
  }

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id == id ? {...question, selected: answer} : question
    }))
  }

  //console.log(questions)

  const questionsElements = questions ? questions.map(question => (
    <Question 
      key={question.id}
      question={question}
      answers={question.answers}
      correct_answer={question.correct}
      id={question.id}
      handleClickAnswer={handleClickAnswer}

    />
    
  )) : []

  function checkAnswers() {

  }

  return (
    <main>
      {
      started ?
      <div>
        {questionsElements}
        <button className='check-answers' onClick={checkAnswers}>Check answers</button>
      </div> : 
      <div className='no-notes'>
        <h1 className='no-notes-title'>Quizzical</h1>
        <p className='no-notes-text'>Some description if needed</p>
        <button className='no-notes-btn' onClick={start}>Start quiz</button>
      </div>
      }
    </main>
    
  )

}