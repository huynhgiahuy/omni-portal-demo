import styles from './styles.less';

type NumberButtonProps = {
  value: string;
  letter: string;
};
const NumberButton: React.FC<NumberButtonProps> = ({ value = '', letter = '', ...props }) => {
  return (
    <button {...props} className={styles.button}>
      <div className={styles['button--number']}>
        <div className={styles['button--number--value']}>{value}</div>
        <div className={styles['button--number--letter']}>
          <div data-text={letter || '&nbsp;'} className={styles['button--number--letter__value']}>
            {letter}
          </div>
        </div>
      </div>
    </button>
  );
};

export default NumberButton;
