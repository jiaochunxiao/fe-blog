import axios from 'axios';
import { runCallback, createObject, getData } from './demo';
jest.mock('axios');

// 1. 捕获函数的调用和返回结果，以及 this和调用顺序
// 2. 它可以让我们自由设置返回结果
// 3. 改变函数内部实现

test('测试 runCallback', () => {
    const func = jest.fn(); // mock function
    // func.mockReturnValueOnce('google');
    // func.mockReturnValueOnce('alibaba');
    func.mockReturnValue('tencent');
    func.mockImplementation(() => {
        return 'google';
    });
    runCallback(func);
    runCallback(func);
    // expect(func).toBeCalled();
    console.log(func.mock);
});

test('测试 createObject', () => {
    const func = jest.fn();
    createObject(func);
});

test('测试 getData', async () => {
    axios.get.mockResolvedValue({data: 'hello'});
    await getData().then((data) => {
        expect(data).toBe('hellod');
    });
});

