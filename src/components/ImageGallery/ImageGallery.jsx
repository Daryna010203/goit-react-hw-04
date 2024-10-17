import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items }) => {
  return (
    <ul className={css.gallery}>
      {items.map(item => (
        <li key={item.id}>
          <ImageCard src={item.urls.small} alt={item.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
