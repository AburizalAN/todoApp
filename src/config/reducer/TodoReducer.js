const initialState = {
  todosGroup: [],
  loading: false,
}

const TodoReducer = (state = initialState, action) => {
  if (action.type === 'SET_TODO') {
    return {
      ...state,
      todosGroup: [
        ...action.payload,
      ],
    }
  }

  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload,
    }
  }
  
  return state;
}

export default TodoReducer;