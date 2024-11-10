// Las teclas de un teclado estan representadas por un arreglo, cuyos elementos son objetos que representan cada fila de un teclado QWERTY (teclado de latinoamerica)
export const keyboardKeys = [
  {
    row: 1,
    keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'"],
  },
  // Como los navegadores no reconocen el caracter comilla inversa (`), he optado por usar el signo más (+)
  {
    row: 2,
    keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "+"],
  },
  {
    row: 3,
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "{"],
  },
  // La tecla SHIFT se reconoce como "Shift"
  {
    row: 4,
    keys: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-", "Shift"],
  },
];

// Los teclados tienen 4 filas de teclas
/*
  {
    row: 5,
    keys: [],
  },
  {
    row: 6,
    keys: [],
  },
*/
