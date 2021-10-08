export interface CarObject {
  name: string;
  color: string;
  id: number;
}

export interface WinnerItem {
  id: number;
  wins: number;
  time: number;
}

export interface CarStarted {
  velocity: number;
  distance: number;
}

export const car = {
  name: '',
  color: '',
};

export const lastId = 0;

export const auto = {
  mark: [
    'Tesla',
    'Mersedes',
    'Ford',
    'BMW',
    'Audi',
    'Jaguar',
    'Aston Martin',
    'Zaz',
    'Ferrari',
    'Porshe',
  ],
  model: ['Cybertrack', 'Benz', 'Mondeo', 'X6', 'A8', 'XF', 'DB9', 'Vida', 'SF90', '911'],
};

export const getRandomValue = (): number => {
  return Math.round(Math.random() * 9);
};

export const getRandomColor = (): string => {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
  let str = '#';
  arr.forEach((): void => {
    str += arr[Math.round(Math.random() * 5)];
  });
  return str;
};
