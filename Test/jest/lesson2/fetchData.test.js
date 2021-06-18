
import { fetchData } from './fetchData';

// 回调函数的异步回调
// test('fetchData 返回结果为 {success: true}', (done) => {
//     fetchData((data) => {
//         expect(data).toEqual({
//             success: true
//         });
//         done();
//     })
// });

// test('fetchData 返回结果为 404', () => {
//     expect.assertions(1);
//     return fetchData().catch((e) => {
//         expect(e.toString().indexOf('404') > -1).toBe(true);
//     });
// });

// test('fetchData {success: true}', () => {
//     return expect(fetchData()).resolves.toMatchObject({
//         data: {
//             success: true
//         }
//     });
// });

// test('fetchData {success: true}', () => {
//     return expect(fetchData()).rejects.toThrow();
// });

// test('fetchData {success: true}', async() => {
//     await expect(fetchData()).resolves.toMatchObject({
//         data: {
//             success: true
//         }
//     });
// });

// test('fetchData {success: true}', async() => {
//     await expect(fetchData()).rejects.toThrow();
// });

// test('fetchData {success: true}', async () => {
//     const response = await fetchData();
//     expect(response.data).toEqual({
//         success: true
//     });
// });


test('fetchData 404', async () => {
    expect.assertions(1);
    try {
        await fetchData();
    } catch (e) {
        expect(e.toString()).toEqual('Error: Request failed with status code 404');
    }
});
