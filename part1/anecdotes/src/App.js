import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const DisplayAnecdote = ({ anecdotes, index }) => <p>{anecdotes[index]}</p>

const DisplayVotes = ({ votes, index }) => <p>has {votes[index]} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const maxVoteIndex = votes.indexOf(Math.max(...votes));

  const getRandomAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);

    while (randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    }

    return randomIndex;
  }

  const updateVote = () => {
    setVotes([...votes.slice(0, selected), votes[selected] + 1, ...votes.slice(selected + 1)]);
  }

  const updateAnecdote = () => setSelected(getRandomAnecdote());

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdotes={anecdotes} index={selected} />
      <DisplayVotes votes={votes} index={selected} />
      <Button handleClick={() => updateVote()} text={'vote'} />
      <Button handleClick={() => updateAnecdote()} text={'next anecdote'} />
      <h1>Anecdote with the most votes</h1>
      <DisplayAnecdote anecdotes={anecdotes} index={maxVoteIndex} />
      <DisplayVotes votes={votes} index={maxVoteIndex} />
    </div>
  )
}

export default App
