test('测试10与10匹配', () => {
    expect(10).toBe(10);
});

// toEqule，对象内容是否相同
test('两个对象,', () => {

    const a = { one: 1 };
    expect(a).toEqual({ one: 1 });
});

test('测试对象内容', () => {
    const a = null;
    expect(a).toBeNull();
});

test('toBeUndefined', () => {
    const a = undefined;
    expect(a).toBeUndefined();
});

test('toBeDefined', () => {
    const a = null;
    expect(a).toBeDefined();
});


test('toBeTruthy', () => {
    const a = true;
    expect(a).toBeTruthy();
});


test('toBeGreaterThan', () => {
    const a = 10;
    const b = 9;
    expect(a).toBeGreaterThan(b);
});

test('toMatch', () => {
    const str = 'https://www.baidu.com';
    expect(str).toMatch(/baidu/);
});

// Array, Set
test('toContain', () => {
    const arr = ['google', 'alibaba', 'baidu'];
    expect(arr).toContain('google');
});

// 异常
const throwNewErrorFunc = () => {
    throw new Error('this is a new error');
};
test('toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new error');
});