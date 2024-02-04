import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchImages } from '../API/images';
import { IMAGES_PER_PAGE } from '../API/images';

import css from './ImageGallery/image-gallery.module.css';
import Loader from './Loader/Loader';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState({});
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data } = await searchImages(search, page);

        setImages(prevImages =>
          data.hits?.length ? [...prevImages, ...data.hits] : prevImages
        );

        if (data.totalHits > IMAGES_PER_PAGE) {
          displayLoadMoreButton(true);
        }

        if (IMAGES_PER_PAGE * page >= data.totalHits) {
          displayLoadMoreButton(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const displayLoadMoreButton = isShow => setIsLoadMore(isShow);

  const showModal = largeImageURL => {
    setModalOpen(true);
    setLargeImage({ largeImageURL });
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImage({});
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      {loading && <Loader />}

      <ImageGallery showModal={showModal} items={images} />
      {isLoadMore && (
        <div className={css.loadMoreWrapper}>
          <Button onClick={loadMore} type="button">
            Load More
          </Button>
        </div>
      )}
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={largeImage.largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
