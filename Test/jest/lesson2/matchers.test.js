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
