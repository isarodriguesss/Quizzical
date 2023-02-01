import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import './App.css'
import Question from './Question'
import blob1 from './assets/blob1.svg'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [checked, setChecked] = useState(false)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
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

  const questionsElements = questions ? questions.map(question => (
    <Question 
      key={question.id}
      question={question}
      answers={question.answers}
      id={question.id}
      handleClickAnswer={handleClickAnswer}

    />
    
  )) : []

  function checkAnswers() {
    let selected = true
    questions.forEach(question => {
      if (question.selected === null) {
        selected = false
        return
      }
    })
    if (!selected) {
      return
    }
    setQuestions(questions => questions.map(question => {
      return {...question, checked: true}
    }))
    setChecked(true)
    let correct = 0
    questions.forEach(question => {
      if (question.correct === question.selected) {
        correct += 1
      }
    })
    setCorrect(correct)
  }

  function handlePlayAgain() {
    setCount(count => count + 1)
    setChecked(false)
  }

  return (
    <main className='main-container'>
      {
      started ?
      <div>
        {questionsElements}
        {
          checked ?
          <div className='result-container'>
            <p className='result-text'>You scored {correct}/{questions.length} correct answers</p>
            <button className='btn-playAgain' onClick={handlePlayAgain}>Play again</button>
          </div> :
          <button className='check-answers' onClick={checkAnswers}>Check answers</button>
        }
      </div> : 
      <div className='no-notes'>
        <h1 className='no-notes-title'>Quizzical</h1>
        <p className='no-notes-text'>Some description if needed</p>
        <button className='no-notes-btn' onClick={start}>Start quiz</button>
      </div>
      }
      <div className='blob1'>
        <img className='left' src={blob1} alt="" />
      </div>
    </main>
    
  )

}