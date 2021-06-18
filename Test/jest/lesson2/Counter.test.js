import Counter from './Counter';

// const counter = new Counter();

// test('测试 Couter中的 addOne', () => {
//     counter.addOne();
//     expect(counter.number).toBe(1)
// });

// test('测试 Couter中的 minusOne', () => {
//     counter.minusOne();
//     expect(counter.number).toBe(0)
// });

describe('测试Counter方法', () => {
    let counter = null;
    beforeAll(() => {
        console.log('beforeAll');
        counter = new Counter();
    });

    beforeEach(() => {
        console.log('beforeEach')
        counter = new Counter();
    });

    afterEach(() => {
        console.log('afterEach');
    })

    afterAll(() => {
        console.log('afterAll');
        counter = null;
    })

    describe('测试Counter中的加法', () => {
        test('测试 Couter中的 addOne', () => {
            console.log('测试 Couter中的 addOne');
            counter.addOne();
            expect(counter.number).toBe(1);
        });

        test('测试 Couter中的 addTwo', () => {
            console.log('测试 Couter中的 addTwo');
            counter.addTwo();
            expect(counter.number).toBe(2);
        });
    });


    describe('测试Counter中的减法', () => {
        test('测试 Couter中的 minusOne', () => {
            console.log('测试 Couter中的 minusOne');
            counter.minusOne();
            expect(counter.number).toBe(-1);
        });

        test('测试 Couter中的 minusTwo', () => {
            console.log('测试 Couter中的 minusTwo');
            counter.minusTwo();
            expect(counter.number).toBe(-2);
        });
    });
})

