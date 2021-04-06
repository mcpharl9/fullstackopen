import React, { useState } from 'react'

const Header = (props) => {
 
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )}

const Subheader = (props) => {
  return (
    <div>
      <h2>{props.subtitle}</h2>
    </div>
  )
}
const Statistics = (props) => {
  
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.all}/>
          <Statistic text="average" value={props.average} />
          <Statistic text="positive" value={props.positive}/>
        </tbody>
      </table>
    </div>
  )
}

const History = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0)  {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      
    </div>
  )  
} 

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return (
    
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const preaverage = good - bad
  const getAverage = (preaverage, all) => {
    let result = (preaverage / all) 
    if (Number.isNaN(result)) {
       return (
         <div>
          0
         </div>
       )
    }
    return (
      <div>
        {result}
      </div>
    )
  }
  const average = getAverage(preaverage, all)
  const getPositive = (good, all) => {
    let final = (good / all) * 100
    if (Number.isNaN(final)) {
      return (
        <div>
          0
        </div>
      )
    }
    return (
      <div>
        {final}%
      </div>
    )
    }
  
  const positive = getPositive(good, all)
  const title = 'give feedback'
  const subtitle = 'statistics' 
  const setToGood = () => {
    setGood(good + 1)
  }
  const setToNeutral = () => {
    setNeutral(neutral + 1)
  }
  const setToBad = () => {
    setBad(bad + 1)
  }
 
  


  return (
    <div>
      <Header title={title} />
      <div>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      </div>
      <div>
        <Subheader subtitle={subtitle} />
      </div>
    
      <>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}  positive={positive} preaverage={preaverage} />
        
      </>
      
      <div>
        <History good={good} neutral={neutral} bad={neutral} />
      </div>
    </div>
  )
}

export default App