import firebase from '../firebase';

export const setTodos = (payload) => {
  return {type: 'SET_TODO', payload: payload};
}

export const setLoading = (payload) => {
  return {type: 'SET_LOADING', payload: payload};
}

export const getTodos = () => {
  return async (dispatch) => {
    const ref = firebase.firestore().collection("todoProject");
    ref.get().then(res => {
      const items = [];
      res.forEach(item => {
          const result = {
              id : item.id,
              todo : item.data()
          }
          items.push(result)
      });
      console.log(items);
      dispatch(setTodos(items));
    });
  };
}

export const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.firestore().collection("todoProject");

    ref.doc(id).delete().then(res => {
      console.log("Document successfully deleted!", res);
      resolve(true);
    }).catch(error => {
      reject(false);
      console.error("Error removing document: ", error);
    });
  })
}

export const postToAPI = (todo) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.firestore().collection("todoProject");
    ref.add(todo)
    .then(res => {
      console.log('Successfully post with id : ', res.id);
      resolve(true);
    })
    .catch(err => {
      console.log('Error : ', err)
      reject(false);
    });
  })
}

export const updateToAPI = (id, todo) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.firestore().collection("todoProject").doc(id);
    ref.set(todo)
    .then(res => {
      console.log('Successfully post with id : ');
      resolve(true);
    })
    .catch(err => {
      console.log('Error : ', err)
      reject(false);
    });
  })
}