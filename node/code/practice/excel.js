const XLSX = require('xlsx');

const aoa = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['2020/10/07', '2020/11/07', '2020/11/08', '2020/11/10', '2020/11/20', '2020/11/25', '2020/11/30']
];

const json = [
  {
    city: '烟台',
    province: '山东',
    name: '苹果',
  },
  {
    city: '武汉',
    province: '湖北',
    name: '鸭脖',
  },
  {
    city: '青岛',
    province: '山东',
    name: '啤酒',
  },
  {
    city: '柳州',
    province: '广西',
    name: '螺狮粉',
  },
];
// aoa to sheet
const exportExcel = type => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `file.${type || 'xlsx'}`);
};
// json to sheet

const exportJsonExcel = type => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(json,)
}

exportExcel();
