
jest.mock('./demo');
import { fetchData } from './demo';
// import Axios from 'axios';
// jest.mock('axios');
const { getNumber } = jest.requireActual('./demo');
// test('fetchData测试', () => {
//   Axios.get.mockResolvedValue({
//     data: "(function() { return '123'})()",
//   });
//   return fetchData().then(data => {
//     expect(eval(data)).toEqual('123');
//   })
// });


test('getNumber', () => {
  expect(getNumber()).toEqual('123');
});

test('fetchData测试', () => {
  return fetchData().then(data => {
    expect(eval(data)).toEqual('123');
  })
});
