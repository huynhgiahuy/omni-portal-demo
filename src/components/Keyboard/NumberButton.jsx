import PT from 'prop-types';

import styles from './styles.less';

NumberButton.propTypes = {
    value: PT.string,
    letter: PT.string,
}

NumberButton.defaultProps = {
    value: '',
    letter: '',
}

export default function NumberButton({ value, letter, ...props }) {
    return (
        <button {...props} className={styles.button}>
            <div className={styles['button--number']}>
                <div className={styles['button--number--value']}>
                    {value}
                </div>
                <div className={styles['button--number--letter']}>
                    <div data-text={letter || '&nbsp;'} className={styles['button--number--letter__value']}>
                        {letter}
                    </div>
                </div>
            </div>
        </button>
    )
}
