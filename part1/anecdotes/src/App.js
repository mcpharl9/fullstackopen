import React, { useState } from 'react'








const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const setToSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  

  const countvotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const largest = (x) => {
    let mostVotes = 0
    let mostVotesIndex = 0
    for (let i = 0; i < x.length; i++) {
      if (x[i] > mostVotes) {
        mostVotes = x[i]
        mostVotesIndex = i
      }
    }
    return [mostVotes, mostVotesIndex]
  }
  const [mostVotes, mostVotesIndex] = largest(votes)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
    
      <div>
        {anecdotes[selected]}
        <div>
        has {votes[selected]} votes
        </div>
        <div>
        <button onClick={setToSelected}>new anecdote</button>
        <button onClick={countvotes}>vote</button>
        </div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[mostVotesIndex]}</div>
        <div>has {mostVotes} votes</div>
        
      </div>
    </div>
  )
}

export default App