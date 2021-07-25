import { BlogActions } from "../../config/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DetailBlog = ({match}) => {

  const idPost = match.params.id;

  const dispatch = useDispatch();
  const { post } = useSelector(state => state.BlogReducer);

  useEffect(() => {
    if (idPost) {
      dispatch(BlogActions.getPostById(idPost));
    }
  }, [idPost]);

  return (
    <section className="my-5">
      <div className="container">
        <h4 className="mb-4">{ post?.title }</h4>
        <p>{ post?.body }</p>
      </div>
    </section>
  )
}

export default DetailBlog;