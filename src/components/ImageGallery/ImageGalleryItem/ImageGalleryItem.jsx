import css from './image-gallery-item.module.css';
import { nanoid } from 'nanoid';

const ImageGalleryItem = ({ showModal, webformatURL, largeImageURL, tags }) => {
  return (
    <li
      key={nanoid()}
      onClick={() => showModal(largeImageURL)}
      className={css.galleryItem}
    >
      <img className={css.galleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
