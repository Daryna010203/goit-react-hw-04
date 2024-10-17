import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} type="button">
        LoadMoreBtn
      </button>
    </div>
  );
};

export default LoadMoreBtn;
