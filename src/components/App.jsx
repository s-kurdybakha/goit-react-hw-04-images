import { PureComponent } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchImages } from '../API/images';
import { IMAGES_PER_PAGE } from '../API/images';

import css from './ImageGallery/image-gallery.module.css';
import Loader from './Loader/Loader';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends PureComponent {
  state = {
    search: '',
    images: [],
    loading: false,
    isLoadMore: false,
    error: null,
    page: 1,
    modalOpen: false,
    largeImage: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchImages(search, page);

      this.setState(({ images }) => ({
        images: data.hits?.length ? [...images, ...data.hits] : images,
      }));

      if (data.totalHits > IMAGES_PER_PAGE) {
        this.displayLoadMoreButton(true);
      }

      if (IMAGES_PER_PAGE * page >= data.totalHits) {
        this.displayLoadMoreButton(false);
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  displayLoadMoreButton = isShow => {
    this.setState({ isLoadMore: isShow });
  };

  showModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      largeImage: { largeImageURL },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      largeImage: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { images, loading, isLoadMore, error, modalOpen, largeImage } =
      this.state;
    // const imagesLength = Boolean(images.length);
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
  }
}
