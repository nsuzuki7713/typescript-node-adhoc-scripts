const random = (num: number) => Math.floor(Math.random() * num);

function calucateDaysBetweenDates(startDate: Date, endDate: Date) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const diff = end - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const random2 = (num: number) => Math.floor(Math.random() * num);

class customeError extends Error {
  constructor(message: string) {
    super(message);
  }

  toString() {
    return this.message;
  }
}

// User
// {name: string, age: number, a: number}
type User = {
  name: string;
  age: number;
  a: number;
};

// クイックソート
const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = arr.slice(1).filter((num) => num <= pivot);
  const right = arr.slice(1).filter((num) => num > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};

quickSort([1, 3, 5, 2, 4, 6]);

// ランダムな文字列を生成
const randomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
