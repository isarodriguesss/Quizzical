import { useState } from 'react'
import {nanoid} from "nanoid"
import he from 'he'


export default function(props) {
  const [results, setResults] = useState(props.answers)
  const [currentAnswer, setCurrentAnswer] = useState()

  //console.log(results)

  function handleClick(answer) {
    if (props.correct) {
      return 
    }
    props.handleClickAnswer(props.id, answer)
  }

  const resultElements = results.map(item => {
    let id = null
    if (props.question.checked) {
      if (props.question.correct === item) {
        id = "correct"
      }
      else if (props.question.selected === item) {
        id = "incorrect"
      }
      else {
        id = "not-selected"
      }
    }
    return (
      <button key={nanoid()} id={id} className={item === props.question.selected ? "answer-selected" : "answer"} onClick={() => handleClick(item)}>{he.decode(item)}</button>
    )
  })

  return (
    <div className='question-container'>
      <h1 className='question-title'>{he.decode(props.question.question)}</h1>
      <div className='question-options-container'>
        {resultElements}
      </div>
      <div className='line'></div>
    </div>
  )
}