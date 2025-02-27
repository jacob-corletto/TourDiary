import { useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import CommentSection from "./CommentSection";
// import ReactionSection from "./ReactionSection";
import { formatDistanceToNow } from "date-fns";
import ImageModal from "./ImageModal";

const PostcardBoard = ({ postcards }) => {
  // const { user } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {postcards.map((postcard) => (
        <article className="no-padding" key={postcard._id}>
          <article className="no-padding top-round">
            <img
              className="responsive medium"
              src={`data:image/jpeg;base64,${postcard.photoUrl}`}
              alt="Postcard"
              onClick={() =>
                handleImageClick(`data:image/jpeg;base64,${postcard.photoUrl}`)
              }
            />
            <div className="absolute bottom left right padding bottom-shadow white-text">
              <nav>
                <h5>{postcard.title}</h5>
                <div className="max"></div>
                <button className="circle transparent">
                  <i>more_vert</i>
                </button>
              </nav>
            </div>
          </article>
          <ul className="list border">
            <li>
              {postcard.user.photoUrl ? (
                <img
                  className="circle"
                  src={`data:image/jpeg;base64,${postcard.user.photoUrl}`}
                  alt={postcard.user.username}
                />
              ) : (
                <button className="circle">{postcard.user.username[0]}</button>
              )}
              <div class="max">
                <h6 class="small">{postcard.user.username}</h6>
                <div>
                  {formatDistanceToNow(new Date(postcard.createdAt))} ago
                </div>
              </div>
            </li>
          </ul>
          <div className=" border padding">
            <p>{postcard.message}</p>
          </div>
        </article>
      ))}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Postcard"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PostcardBoard;
