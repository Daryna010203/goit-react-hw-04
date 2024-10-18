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
  const [selectedImage, setSelectedImage] = useState(null);

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
        const totalPages = response.data.total_pages;

        setImages(prevImages => [...prevImages, ...fetchedImages]);
        setTotalPages(totalPages);
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
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    if (page >= 1) {
      // Используем небольшой таймаут, чтобы дождаться рендеринга изображений перед прокруткой
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 500); // Задержка на 500ms
    }
  }, [images, page]);

  const openImageModal = (imageUrl, imageAlt) => {
    setSelectedImage({ imageUrl, imageAlt }); // Відкриття модального вікна
  };

  const closeImageModal = () => {
    setSelectedImage(null); // Закриття модального вікна
  };

  return (
    <section>
      <SearchBar onSearch={onSearch} />

      {error && <ErrorMessage error={error} />}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openImageModal} />
      )}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {loading && <Loader />}
      {/* Модальне вікно */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeImageModal}
          imageUrl={selectedImage.imageUrl}
          imageAlt={selectedImage.imageAlt}
        />
      )}
    </section>
  );
};

export default App;
