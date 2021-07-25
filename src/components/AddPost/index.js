import styles from '../../styles/AddPost.module.scss';
import { BlogActions } from '../../config/actions';
import { useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';

const AddPost = ({toggle}) => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  const handlePost = () => {
    toggle();
    dispatch(
      BlogActions.createPost({
        title: title,
        body: body,
        userId: 1,
      })
    )
  }

  return (
    <section className={`${styles.addPostWrapper} mb-5 position-fixed w-100`}>
      <div className={styles.overlay} onClick={toggle}></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="bg-white p-4 shadow position-relative" style={{zIndex: 1000}}>
              <div className="row align-items-center mb-4">
                <div className="col-md-2 mb-3 mb-md-0">
                  Title
                </div>
                <div className="col-md-10">
                  <input 
                    value={title} 
                    type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-4">
                <div className="col-md-2 mb-3 mb-md-0">
                  Body
                </div>
                <div className="col-md-10">
                  <textarea 
                    style={{ height: '200px' }} 
                    type="text" 
                    className="form-control" 
                    placeholder="Your Post Here" 
                    onChange={e => setBody(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-end">
                <button onClick={handlePost} type="button" className="btn btn-primary shadow" style={{ width: '160px' }}>Create Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddPost;