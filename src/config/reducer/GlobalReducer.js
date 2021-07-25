const initialState = {
  route: null,
}

const GlobalReducer = (state = initialState, action) => {
  if (action.type === 'SET_ROUTE') {
    return {
      ...state,
      route: action.payload,
    }
  }
  
  return state
}

export default GlobalReducer;