import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import css from '../ImageGallery/image-gallery.module.css';

const ImageGallery = ({ showModal, items }) => {
  return (
    <ul className={css.gallery}>
      {items.map(({ webformatURL, largeImageURL, tags, id }) => {
        return (
          <ImageGalleryItem
            key={nanoid()}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
