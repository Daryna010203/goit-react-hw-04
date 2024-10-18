import css from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
