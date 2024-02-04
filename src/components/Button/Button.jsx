import css from './button.module.css';

const Button = ({ onClick, type = 'submit', children }) => {
  return (
    <button onClick={onClick} type={type} className={css.btn}>
      {children}
    </button>
  );
};

export default Button;
