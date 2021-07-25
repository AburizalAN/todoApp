import styles from '../../styles/Todo.module.scss';
import { useState } from 'react';
import { Check, HighlightOff } from '@material-ui/icons';

const TodoItem = ({todo, handleDelete, handleCheck, check}) => {

  return (
    <div className={`${styles.todoItem}`}>
      <div onClick={handleCheck} style={{flex: 1}} className={`${styles.todoItem_item} d-flex p-3`}>
        <div>
          {
            check ? 
            <div className={styles.checked}>
              <Check />
            </div>
            :
            <div className={styles.check}></div>
          }
        </div>
        <div className={styles.text}>
          {todo && todo?.todo}
        </div>
      </div>
      <button onClick={handleDelete} className={`${styles.close} px-3`}>
        <HighlightOff />
      </button>
    </div>
  )
}

export default TodoItem;