interface DataType {
  key: string;
  huongcuocgoi: string;
  somaygoi: string;
  tennguoigoi: string;
  somaynhan: string;
  tennguoinhan: string;
  thoigianbatdau: string;
  thoiluong: string;
  ketqua: string;
  ghiam: string;
  ghichu: string;
}

export interface DataTypeDanhBa {
  key: string;
  stt: string;
  name: string;
  phone_number: string;
  work_address: string;
  ip_phone: string;
  email: string;
  loai: string;
  note: string;
}

export const data: DataType[] = [
  {
    key: '1',
    huongcuocgoi: 'gọi vào',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Nhỡ trong hàng chờ',
    ghiam: 'ok',
    ghichu: 'Hỗ trợ ticket SC01293192312312. Hỗ trợ sớm nha anh chị. Cảm ơn anh chị',
  },
  {
    key: '2',
    huongcuocgoi: 'gọi vào',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Thành công',
    ghiam: 'ok',
    ghichu: 'test',
  },
  {
    key: '3',
    huongcuocgoi: 'gọi ra',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Thành công',
    ghiam: 'ok',
    ghichu: 'test',
  },
  {
    key: '4',
    huongcuocgoi: 'gọi ra',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Thành công',
    ghiam: 'ok',
    ghichu: 'test',
  },
  {
    key: '5',
    huongcuocgoi: 'gọi vào',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Thành công',
    ghiam: 'ok',
    ghichu: 'test',
  },
  {
    key: '6',
    huongcuocgoi: 'gọi ra',
    somaygoi: '09098029992',
    tennguoigoi: 'Nguyễn Thu Hương',
    somaynhan: '109',
    tennguoinhan: 'Trần Hồng Quân',
    thoigianbatdau: '31/01/2022 19:09:09',
    thoiluong: '00:11:16',
    ketqua: 'Thành công',
    ghiam: 'ok',
    ghichu: 'test',
  },
];

export const dataDanhba: DataTypeDanhBa[] = [
  {
    key: '1',
    stt: '',
    name: 'Robert Fox1',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
  {
    key: '2',
    stt: '',
    name: 'Robert Fox2',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
  {
    key: '3',
    stt: '',
    name: 'Robert Fox3',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
  {
    key: '4',
    stt: '',
    name: 'Robert Fox4',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
  {
    key: '5',
    stt: '',
    name: 'Robert Fox5',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
  {
    key: '6',
    stt: '',
    name: 'Robert Fox6',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_address: 'SCC',
  },
];
