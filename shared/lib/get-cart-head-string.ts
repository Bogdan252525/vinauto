export const getCartHeadString = (count: number) => {
  if (count === 0) {
    return 'Корзина порожня';
  }

  const itemWord =
    count === 1
      ? 'товар'
      : count > 1 && count < 5
      ? 'товари'
      : 'товарів';

  return `В корзині ${count} ${itemWord}`;
};