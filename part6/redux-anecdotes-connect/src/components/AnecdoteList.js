import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementVotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filteredAnecdotes = useSelector(({ anecdotes, filter }) => {
    const contentIncludesFilter = (anecdotes) =>
      anecdotes.content.toLowerCase().includes(filter.toLowerCase());

    const byVotesDescending = (a, b) => b.votes - a.votes;

    return anecdotes.filter(contentIncludesFilter).sort(byVotesDescending);
  });

  const handleVote = (anecdote) => {
    dispatch(incrementVotes(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
