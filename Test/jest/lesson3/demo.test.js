import { generateConfig, generateAnotherConfig } from "./demo";

// test('测试 generateConfig', () => {
//     expect(generateConfig()).toMatchSnapshot({
//         time: expect.any(Date),
//     });
// });

// test('测试 generateAnotherConfig', () => {
//     expect(generateAnotherConfig()).toMatchSnapshot({
//         time: expect.any(Date),
//     });
// });

test("测试 generateAnotherConfig", () => {
  expect(generateAnotherConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date)
    },
    `
    Object {
      "domain": "localhost",
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});
