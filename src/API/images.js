import axios from 'axios';
export const IMAGES_PER_PAGE = 12;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '41017518-95b21bb0f6248f508a9feed4e',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = (q, page = 1, per_page = IMAGES_PER_PAGE) => {
  return instance.get('/', {
    params: {
      q,
      page,
      per_page,
    },
  });
};
