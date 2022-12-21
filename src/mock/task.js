import {generateDescription, getRandomStatus} from '../utils/utils';
import {nanoid} from 'nanoid';

const createTask = () => ({
  id: nanoid(),
  description: generateDescription(),
  group: getRandomStatus()
});

export {createTask};
