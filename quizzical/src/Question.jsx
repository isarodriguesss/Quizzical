import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import he from 'he'


export default function(props) {
  const [results, setResults] = useState([props.answers])
  const [currentAnswer, setCurrentAnswer] = useState()

  console.log(results)

  const resultElements = results.map(item => 
    {console.log(item.value)}
    /* {<p key={index} className={`question-options${index == currentAnswer ? "-selected" : ""}`} onClick={() => setCurrentAnswer(index)}>{he.decode(item.value)} </p>} */
  )

  return (
    <div className='question-container'>
      <h1 className='question-title'>{he.decode(props.question)}</h1>
      <div className='question-options-container'>
        {resultElements}
      </div>
      <div className='line'>_____________________________________________________________________________________________________________________________</div>
    </div>
  )
}