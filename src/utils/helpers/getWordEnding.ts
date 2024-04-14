// Принимает в себя числительное и 3 варианта использования существительного: с единицей, с двойкой, с пятёркой.

const getWordEnding = (number: number, words: [string, string, string]) =>
  words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];

export default getWordEnding;
