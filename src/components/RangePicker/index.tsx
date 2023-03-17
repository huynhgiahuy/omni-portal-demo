import { DatePicker } from 'antd';
import styles from './style.less';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface RangePickerProps {
  handleChangeValueRangePicker: (value: any, dateString: any) => void;
}

const CustomizeRangePicker: React.FC<RangePickerProps> = (props) => {
  const { handleChangeValueRangePicker } = props;
  return (
    <RangePicker
      onChange={handleChangeValueRangePicker}
      className={styles.antRangePicker}
      placeholder={['Từ ngày', 'Đến ngày']}
      format="DD-MM-YYYY"
      ranges={{
        'Hôm nay': [moment(), moment()],
        'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '7 ngày qua': [moment().subtract(6, 'days'), moment()],
        '30 ngày qua    ': [moment().subtract(29, 'days'), moment()],
        'Tháng này': [moment().startOf('month'), moment().endOf('month')],
        'Tháng trước': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
        'Năm này': [moment().startOf('year'), moment().endOf('year')],
        'Năm trước': [
          moment().subtract(1, 'year').startOf('year'),
          moment().subtract(1, 'year').endOf('year'),
        ],
      }}
      popupClassName={styles.antRangePicker}
    />
  );
};

export default CustomizeRangePicker;
