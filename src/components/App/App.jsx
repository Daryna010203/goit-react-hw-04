import css from './App.module.css';
import axios from 'axios';

import { useState, useEffect } from 'react';

import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import Loader from '../Loader/Loader.jsx';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onSearch = userSearch => {
    setQuery(userSearch);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query === null) return;
    async function fetchImages() {
      try {
        setError(null);
        setLoading(true);

        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=31vOygG6dJTDM4WYDN9lcflKaCM7oYZNQcHe6lBV_Co&page=${page}&query=${query}`
        );
        console.log(response);

        const fetchedImages = response.data.results;
        const totalPages = response.data.total_pages; // Получаем количество страниц

        setImages(prevImages => [...prevImages, ...fetchedImages]); // Добавляем новые изображения к старым
        setTotalPages(totalPages); // Сохраняем общее количество страниц
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1); // Увеличиваем номер страницы
    }
  };

  return (
    <section>
      <SearchBar onSearch={onSearch} />

      {error && <ErrorMessage error={error} />}
      {images.length > 0 && <ImageGallery items={images} />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {loading && <Loader />}
    </section>
  );
};

export default App;
