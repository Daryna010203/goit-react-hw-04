import css from './App.module.css';
import axios from 'axios';

import { nanoid } from 'nanoid';
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

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);

        const response = await axios.get(
          'https://api.unsplash.com/search/photos?client_id=31vOygG6dJTDM4WYDN9lcflKaCM7oYZNQcHe6lBV_Co&page=1&query=school>'
        );
        setImages(response.data.results);
        console.log(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  console.log(images);

  return (
    <section>
      <SearchBar />
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery items={images} />}

      <LoadMoreBtn />
    </section>
  );
};

export default App;
