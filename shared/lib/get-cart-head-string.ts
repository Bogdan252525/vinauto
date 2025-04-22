export const getCartHeadString = (count: number): string => {
  if (count < 0) {
    throw new Error('Кількість товарів не може бути від’ємною.');
  }

  if (count === 0) {
    return 'Корзина порожня';
  }

  const itemWord = count === 1 
    ? 'товар' 
    : count > 1 && count < 5 
    ? 'товари' 
    : 'товарів';

  return `В корзині ${count} ${itemWord}`;
};
