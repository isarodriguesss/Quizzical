import { useState, useEffect } from 'react'

export default function(props) {
  const [results, setResults] = useState(props.incorrect_answers)
  
  useEffect(() => {
    setResults(prevResults => {
      return [props.correct_answer, ...prevResults]
    })
  }, [])

  console.log(results)

  const resultElements = results.map(result => <span key={result}>{JSON.stringify(result)}</span>)

  return (
    <div>
      <h1>{props.value}</h1>
      {resultElements}
    </div>
  )
}