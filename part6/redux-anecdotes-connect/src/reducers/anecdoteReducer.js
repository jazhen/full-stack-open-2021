import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const incrementVotes = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote);

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export default anecdoteReducer;
