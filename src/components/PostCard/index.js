import { useHistory } from "react-router-dom";

const PostCard = ({post}) => {

  const history = useHistory();

  return (
    <div className="col-lg-3 col-md-4 mb-4 d-flex">  
      <div className="card shadow w-100">
        {/* <img src="..." className="card-img-top" alt="..."> */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{post?.title.slice(0, 20)}...</h5>
          <p className="card-text" style={{flex: 1}}>{ post?.body?.slice(0, 100)}...</p>
          <a onClick={() => history.push(`/detail/${post?.id}`)} className="btn btn-primary">See Detail</a>
        </div>
      </div>
    </div>
  )
}

export default PostCard;