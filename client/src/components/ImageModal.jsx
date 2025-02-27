import "../styles/ImageModal.css"; // Ensure you have the correct path to your CSS file

const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={src} alt={alt} className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;
