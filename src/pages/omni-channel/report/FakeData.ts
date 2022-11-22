interface DataType {
  id: string;
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
  id: string;
  stt: string;
  full_name: string;
  phone_number: string;
  work_unit: string;
  ip_phone: string;
  email: string;
  loai: string;
  note: string;
}

export const data: DataType[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
    id: '1',
    stt: '',
    full_name: 'Robert Fox1',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
  {
    id: '2',
    stt: '',
    full_name: 'Robert Fox2',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
  {
    id: '3',
    stt: '',
    full_name: 'Robert Fox3',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
  {
    id: '4',
    stt: '',
    full_name: 'Robert Fox4',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
  {
    id: '5',
    stt: '',
    full_name: 'Robert Fox5',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
  {
    id: '6',
    stt: '',
    full_name: 'Robert Fox6',
    phone_number: '0909090909',
    ip_phone: '449003',
    email: 'robertfox@gmail.com',
    loai: '',
    note: '',
    work_unit: 'SCC',
  },
];
