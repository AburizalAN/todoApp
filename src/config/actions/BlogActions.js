export const setPosts = (payload) => {
  return {type: "SET_POSTS", payload: payload}
}

export const setPostById = (payload) => {
  return {type: "SET_POST_BY_ID", payload: payload}
}

export const setNewPost = (payload) => {
  return {type: "SET_NEW_POST", payload: payload}
}

export const getPosts = () => {
  return async (dispatch) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const responseJSON = await response.json();
    dispatch(setPosts(responseJSON));
  }
}

export const getPostById = (id) => {
  return async (dispatch) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const responseJSON = await response.json();
    dispatch(setPostById(responseJSON));
  }
}

export const createPost = (form) => {
  return async (dispatch) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(form)
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    dispatch(setNewPost(responseJSON));
  }
}