test("two plus two is four", () => {
  console.log(process.env.NODE_ENV);
  console.log(process.env.TEST_ENV);
  expect(2 + 2).toBe(4);
});
