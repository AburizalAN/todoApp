
import styles from '../../styles/Todo.module.scss';
import TodoItem from '../../components/TodoItem';
import { Send } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { TodoActions } from '../../config/actions';
import { useDispatch, useSelector } from 'react-redux';
import HeaderFixed from '../../components/HeaderFixed';
import { analytics } from '../../config/firebase';

const Todo = (props) => {

  const dispatch = useDispatch();
  const { loading, todosGroup } = useSelector(state => state.TodoReducer);
  const [ inputTodo, setInputTodo ] = useState('');
  const [ todos, setTodos ] = useState({});
  const [ todoId, setTodoId ] = useState(1);
  const [ idUpdate, setIdUpdate ] = useState(null);

  console.log('url', window.location.href);
  console.log('props', props);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTodos({
      ...todos,
      [todoId] : {id:todoId, todo: inputTodo, check: false}
    })
    setTodoId(todoId + 1);
    setInputTodo('');
  }

  const handleDelete = (id) => {
    const tempTodos = {...todos};
    delete tempTodos[id];
    setTodos(tempTodos);
  } 

  const handleCheck = (id) => {
    const tempTodos = {...todos};
    tempTodos[id].check = !tempTodos[id].check;
    setTodos(tempTodos)
  };

  const handleSubmitTodo = async () => {
    if (!idUpdate) {
      const response = await TodoActions.postToAPI(todos);
      if (response) {
        dispatch(TodoActions.getTodos())
        setTodos({});
        setTodoId(1)
      };
    } else {
      console.log(idUpdate);
      console.log(todos);
      const response = await TodoActions.updateToAPI(idUpdate, todos);
      console.log('response from update', response);
      if (response) {
        setIdUpdate(null);  
        setTodos({});  
        dispatch(TodoActions.getTodos());
      }
    }
  };

  const handleUpdateTodo = (id, todo) => {
    const keys = Object.keys(todo);
    setIdUpdate(id);
    setTodos({...todo})
    setTodoId(parseInt(keys[keys.length - 1]) + 1);
  }

  const handleDeleteTodo = async (id) => {
    const response = await TodoActions.deleteTodo(id);
    if (response) {
      dispatch(TodoActions.getTodos());
    }
  }

  useEffect(() => {
    if (idUpdate) console.log(idUpdate);
  }, [idUpdate])

  useEffect(() => {
    console.log("loading from redux", loading);
  }, [loading]);

  useEffect(() => {
    dispatch(TodoActions.getTodos())
  }, [dispatch]);

  useEffect(() => {
    analytics.logEvent('page_view', {
      page_location: window.location.href,
      page_path: props?.location?.pathname,
      page_title: 'todo',
    })
  }, [props]);

  return (
    <div className="position-relative">
      <HeaderFixed />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className={styles.title}>
              Todo App Main ini
            </h1>  
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-8 mb-4">
            <form className="d-flex" onSubmit={(e) => handleAddTodo(e)}>
              <input 
                placeholder="Masukkan todo anda di sini"
                className="form-control p-3 shadow"
                onChange={(e) => setInputTodo(e.target.value)}
                value={inputTodo}
              />
              <button className={styles.buttonEnter}><Send /></button>
            </form>
          </div>
          <div className="col-md-8 mb-4">
            <div className={`${styles.bodyFormWrapper} shadow`}>
              {
                todos &&
                Object.values(todos).map((todo, index) => (
                  <TodoItem handleCheck={() => handleCheck(todo.id)} check={todo.check} key={index} todo={todo} handleDelete={() => handleDelete(todo.id)}/>
                ))
              }
            </div>
            <div className="mt-4 text-end">
              {
                Object.values(todos).length > 0 &&
                <button onClick={handleSubmitTodo} type="button" className="btn btn-primary">
                  Submit Todo List
                </button>
              }
            </div>
          </div>
        </div>
      
        <div className="row mt-5 mb-5">
          {
            todosGroup?.map((todos, index) => 
              <div className="col-md-4 mb-5" key={index}>
                <div className="position-relative">
                  <div className={`${styles.bodyFormWrapper} shadow`}>
                    {
                      Object.values(todos.todo).map(todoItem => (
                        <TodoItem handleCheck={() => {}} check={todoItem.check} key={todoItem.id} todo={todoItem} handleDelete={() => {}}/>
                      ))
                    }
                  </div>
                  <div className={styles.overlay}>
                    <button onClick={() => handleUpdateTodo(todos.id, todos.todo)} className="btn btn-primary me-2">Update</button>
                    <button onClick={() => handleDeleteTodo(todos.id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Todo;