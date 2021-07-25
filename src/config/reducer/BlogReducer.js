const initialState = {
  posts: [],
  post: {}
}

const BlogReducer = (state = initialState, action) => {
  if (action.type === 'SET_POSTS') {
    return {
      ...state,
      posts: action.payload
    }
  }

  if (action.type === 'SET_POST_BY_ID') {
    return {
      ...state,
      post: action.payload
    } 
  }

  if (action.type === 'SET_NEW_POST') {
    return {
      ...state,
      posts: [
        action.payload,
        ...state.posts,
      ]
    }
  }
  
  return state;
}

export default BlogReducer;