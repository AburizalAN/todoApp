import HeaderFixed from "../../components/HeaderFixed"
import PostCard from "../../components/PostCard"
import { useEffect, useState } from "react"
import { BlogActions } from "../../config/actions"
import { useDispatch, useSelector } from "react-redux"
import AddPost from "../../components/AddPost"

const Blog = () => {

  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.BlogReducer);
  const [ addPost, setAddPost ] = useState(false);

  useEffect(() => {
    dispatch(BlogActions.getPosts());
  }, [dispatch])

  console.log(posts);

  return (
    <>
      <section className="position-relative">
        <HeaderFixed />
      </section>
      <div style={{marginTop: '180px'}}></div>
      
      <section className="mb-5">
        <div className="container">
          <div className="text-end">
            <button onClick={() => setAddPost(!addPost)} type="button" className="btn btn-warning shadow" style={{ width: '200px' }}>Add New Post</button>
          </div>
        </div>
      </section>
      
      {
        addPost &&
        <AddPost toggle={() =>setAddPost(false)} />
      }
      
      <section>
        <div className="container">
          <div className="row">
            {
              posts?.map(post => (
                <PostCard key={post?.id} post={post} />
              ))
            }
          </div>
        </div>
      </section>
    </>

  )
}

export default Blog;