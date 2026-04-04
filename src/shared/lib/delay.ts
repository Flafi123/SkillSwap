//эмуляция задержки от сервера

export const delay = (min = 500, max = 3500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min))
}
