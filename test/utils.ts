import axios from 'axios'

export const testFn = (number: number, callBack: Function) => {
  if (number > 10) {
    callBack(number)
  }
}

export const request = async () => {
  const { data } = await axios.get('fake.url')
  return data
}
