import timer from './timer';

jest.useFakeTimers();

test('test timer', () => {
  const fn = jest.fn();
  timer(fn);
  // jest.runAllTimers();
  // jest.runOnlyPendingTimers();
  jest.advanceTimersByTime(3000);
  expect(fn).toHaveBeenCalledTimes(1);
});
