import {TASK_STATUS} from '../const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const descriptionText = ['Сходить в спортзал', 'Сделать домашку', 'Покормить кота', 'Погулять с другом', 'Выпить кофе', 'Съездить на море', 'Отметить новый год', 'Нарядить елку'];

const generateDescription = () => descriptionText[getRandomInteger(0, descriptionText.length - 1)];

const getRandomStatus = () => {
  const statusKeys = Object.keys(TASK_STATUS);
  return TASK_STATUS[statusKeys[getRandomInteger(0, statusKeys.length - 1)]];
};

export {generateDescription, getRandomStatus};
