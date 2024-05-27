export const multiplyPrice = (price: number, count: number) => {
  const priceBy100 = price * 100 * count
  return priceBy100 / 100
}

export const addPrices = (priceOne: number, priceTwo: number) => {
  const priceOneBy100 = priceOne * 100
  const priceTwoBy100 = priceTwo * 100
  const sum = priceOneBy100 + priceTwoBy100
  return sum / 100
}

export const subtractPrices = (priceOne: number, priceTwo: number) => {
  const priceOneBy100 = priceOne * 100
  const priceTwoBy100 = priceTwo * 100
  const sum = priceOneBy100 - priceTwoBy100
  return sum / 100
}

export const moneySum = (prices: number[]) => {
  return prices.reduce(
    (firstPrice: number, secondPrice: number) =>
      addPrices(firstPrice, secondPrice),
    0
  )
}
