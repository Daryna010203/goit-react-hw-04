import ReactModal from 'react-modal';
import { useEffect } from 'react';

import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, imageUrl, imageAlt }) => {
  // Обробка натискання ESC для закриття модального вікна
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onRequestClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose} // Закриття при кліку поза межами модалки
      className={css.modalContent} // Класи для стилізації модального вікна
      overlayClassName={css.modalOverlay} // Класи для стилізації фону
      ariaHideApp={false} // Не ховаємо основний контент (для демо)
    >
      <button onClick={onRequestClose} className={css.closeButton}>
        ✖
      </button>
      <img src={imageUrl} alt={imageAlt} className={css.largeImage} />
    </ReactModal>
  );
};

export default ImageModal;
