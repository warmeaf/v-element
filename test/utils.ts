export const testFn = (number: number, callBack: Function) => {
  if (number > 10) {
    callBack(number)
  }
}
