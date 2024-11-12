// DATOS
const guitarNeck = [
  {
    rope: 1,
    frets: [
      {
        id: 100,
        chord: 0,
        file: "1-0",
      },
      {
        id: 101,
        chord: 1,
        file: "1-1",
      },
      {
        id: 102,
        chord: 2,
        file: "1-2",
      },
      {
        id: 103,
        chord: 3,
        file: "1-3",
      },
      {
        id: 104,
        chord: 4,
        file: "1-4",
      },
      {
        id: 105,
        chord: 5,
        file: "1-5",
      },
      {
        id: 106,
        chord: 6,
        file: "1-6",
      },
    ],
  },
  {
    rope: 2,
    frets: [
      {
        id: 200,
        chord: 0,
        file: "2-0",
      },
      {
        id: 201,
        chord: 1,
        file: "2-1",
      },
      {
        id: 202,
        chord: 2,
        file: "2-2",
      },
      {
        id: 203,
        chord: 3,
        file: "2-3",
      },
      {
        id: 204,
        chord: 4,
        file: "2-4",
      },
      {
        id: 205,
        chord: 5,
        file: "2-5",
      },
      {
        id: 206,
        chord: 6,
        file: "2-6",
      },
    ],
  },
  {
    rope: 3,
    frets: [
      {
        id: 300,
        chord: 0,
        file: "3-0",
      },
      {
        id: 301,
        chord: 1,
        file: "3-1",
      },
      {
        id: 302,
        chord: 2,
        file: "3-2",
      },
      {
        id: 303,
        chord: 3,
        file: "3-3",
      },
      {
        id: 304,
        chord: 4,
        file: "3-4",
      },
      {
        id: 305,
        chord: 5,
        file: "3-5",
      },
      {
        id: 306,
        chord: 6,
        file: "3-6",
      },
    ],
  },
  {
    rope: 4,
    frets: [
      {
        id: 400,
        chord: 0,
        file: "4-0",
      },
      {
        id: 401,
        chord: 1,
        file: "4-1",
      },
      {
        id: 402,
        chord: 2,
        file: "4-2",
      },
      {
        id: 403,
        chord: 3,
        file: "4-3",
      },
      {
        id: 404,
        chord: 4,
        file: "4-4",
      },
      {
        id: 405,
        chord: 5,
        file: "4-5",
      },
      {
        id: 406,
        chord: 6,
        file: "4-6",
      },
    ],
  },
  {
    rope: 5,
    frets: [
      {
        id: 500,
        chord: 0,
        file: "5-0",
      },
      {
        id: 501,
        chord: 1,
        file: "5-1",
      },
      {
        id: 502,
        chord: 2,
        file: "5-2",
      },
      {
        id: 503,
        chord: 3,
        file: "5-3",
      },
      {
        id: 504,
        chord: 4,
        file: "5-4",
      },
      {
        id: 505,
        chord: 5,
        file: "5-5",
      },
      {
        id: 506,
        chord: 6,
        file: "5-6",
      },
    ],
  },
  {
    rope: 6,
    frets: [
      {
        id: 600,
        chord: 0,
        file: "6-0",
      },
      {
        id: 601,
        chord: 1,
        file: "6-1",
      },
      {
        id: 602,
        chord: 2,
        file: "6-2",
      },
      {
        id: 603,
        chord: 3,
        file: "6-3",
      },
      {
        id: 604,
        chord: 4,
        file: "6-4",
      },
      {
        id: 605,
        chord: 5,
        file: "6-5",
      },
      {
        id: 606,
        chord: 6,
        file: "6-6",
      },
    ],
  },
];
const keyboardKeys = [
  {
    row: 1,
    keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'"],
  },
  {
    row: 2,
    keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "´"],
  },
  {
    row: 3,
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "{"],
  },
  {
    row: 4,
    keys: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-", "Shift"],
  },
  //   {
  //     row: 5,
  //     keys: [],
  //   },
  //   {
  //     row: 6,
  //     keys: [],
  //   },
];

// DEVOLVER UN NUEVO ARREGLO QUE CONTENGA LAS TECLAS ASIGNADAS A CADA NOTA Y QUE PUEDA EMPEZAR DESDE UNA FILA DE CUERDAS
// TAMBIEN QUE PUEDA INVERTIR EL ORDEN DE LAS TECLAS ASIGNADAS
// MANTENER ASIGNADA UNA TECLA EN LA COLUMNA DE NOTAS 0 (propiedad chord igual a 0) Y QUE SE MANTENGA INCLUSO CUANDO SE MODIFICA starFromTheChord
const dynamicAlgoritm3 = (
  firstRope,
  secondRope,
  thirdRope,
  fourthRope,
  fifthRope,
  sixthRope,
  firstRowKeys,
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  fifthRowKeys,
  sixthRowKeys,
  startFromTheChord,
  invertKeyboard,
  lockTheZeroChord
) => {
  // Asigna las teclas correspondientes de cada fila del teclado.
  // Utiliza el operador optional chaining para que devuelva undefined si no existe aquella propiedad en lugar de devolver un error
  // Utiliza un operador ternario para aplicar el parametro de invertir teclas
  let assignFirstRowKeys =
    invertKeyboard === false
      ? keyboardKeys[firstRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - firstRowKeys]?.keys;
  let assignSecondRowKeys =
    invertKeyboard === false
      ? keyboardKeys[secondRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - secondRowKeys]?.keys;
  let assignThirdRowKeys =
    invertKeyboard === false
      ? keyboardKeys[thirdRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - thirdRowKeys]?.keys;
  let assignFourthRowKeys =
    invertKeyboard === false
      ? keyboardKeys[fourthRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - fourthRowKeys]?.keys;
  let assignFifthRowKeys =
    invertKeyboard === false
      ? keyboardKeys[fifthRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - fifthRowKeys]?.keys;
  let assignSixthRowKeys =
    invertKeyboard === false
      ? keyboardKeys[sixthRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - sixthRowKeys]?.keys;

  // Encuentra la cuerda específica en el objeto 'guitarNeck' (mástil de la guitarra).
  let findFirstRope = guitarNeck.find((n) => n.rope === firstRope);
  let findSecondRope = guitarNeck.find((n) => n.rope === secondRope);
  let findThirdRope = guitarNeck.find((n) => n.rope === thirdRope);
  let findFourthRope = guitarNeck.find((n) => n.rope === fourthRope);
  let findFifthRope = guitarNeck.find((n) => n.rope === fifthRope);
  let findSixthRope = guitarNeck.find((n) => n.rope === sixthRope);

  // Asigna las teclas a los trastes de la primera cuerda desde el índice especificado por 'startFromTheChord'.
  for (let index = 0; index < findFirstRope.frets.length; index++) {
    // Asigna la tecla correspondiente
    let element = findFirstRope.frets[index];

    // Comportamiento por defecto si lockTheZeroChord esta en false
    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignFirstRowKeys?.length) {
        element.key = assignFirstRowKeys[index - startFromTheChord];
      } else {
        // Si no hay tecla, asigna undefined
        element.key = undefined;
      }
    } else {
      // Si está bloqueado, asigna undefined
      element.key = undefined;
    }

    // Evita que empiece desde el acorde 0 si lockTheZeroChord es true
    if (lockTheZeroChord === true && startFromTheChord === 0) {
      // Cambia a 1 para evitar el acorde 0
      startFromTheChord = 1;
    }

    // Comportamiento si lockTheZeroChord esta en true
    if (index === 0 && lockTheZeroChord === true) {
      // Utiliza el operador chaining si no existe el elemento
      const elementKey =
        assignFirstRowKeys?.[0] !== undefined ? assignFirstRowKeys?.[0] : "";
      if (elementKey) {
        // Asigna la tecla de la posición 0
        element.key = elementKey;
      }
      // Continúa con la siguiente iteración
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignFirstRowKeys?.length) {
          // Asigna la tecla correspondiente
          element.key = assignFirstRowKeys[index - startFromTheChord + 1];
        } else {
          // Si no hay tecla, asigna undefined
          element.key = undefined;
        }
      } else {
        // Si el índice es menor que startFromTheChord, asigna undefined
        element.key = undefined;
      }
    }
  }

  //  Repite el mismo procedimiento para las demás cuerdas
  // La lógica es la misma para cada cuerda
  for (let index = 0; index < findSecondRope.frets.length; index++) {
    let element = findSecondRope.frets[index];

    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignSecondRowKeys?.length) {
        element.key = assignSecondRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    } else {
      element.key = undefined;
    }

    if (lockTheZeroChord === true && startFromTheChord === 0) {
      startFromTheChord = 1;
    }

    if (index === 0 && lockTheZeroChord === true) {
      const elementKey =
        assignSecondRowKeys?.[0] !== undefined ? assignSecondRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }
      console.log(elementKey);
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignSecondRowKeys?.length) {
          element.key = assignSecondRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }
    }
  }

  for (let index = 0; index < findThirdRope.frets.length; index++) {
    let element = findThirdRope.frets[index];

    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignThirdRowKeys?.length) {
        element.key = assignThirdRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    } else {
      element.key = undefined;
    }

    if (lockTheZeroChord === true && startFromTheChord === 0) {
      startFromTheChord = 1;
    }

    if (index === 0 && lockTheZeroChord === true) {
      const elementKey =
        assignThirdRowKeys?.[0] !== undefined ? assignThirdRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }
      console.log(elementKey);
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignThirdRowKeys?.length) {
          element.key = assignThirdRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }
    }
  }

  for (let index = 0; index < findFourthRope.frets.length; index++) {
    let element = findFourthRope.frets[index];

    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignFourthRowKeys?.length) {
        element.key = assignFourthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    } else {
      element.key = undefined;
    }

    if (lockTheZeroChord === true && startFromTheChord === 0) {
      startFromTheChord = 1;
    }

    if (index === 0 && lockTheZeroChord === true) {
      const elementKey =
        assignFourthRowKeys?.[0] !== undefined ? assignFourthRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }
      console.log(elementKey);
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignFourthRowKeys?.length) {
          element.key = assignFourthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }
    }
  }

  for (let index = 0; index < findFifthRope.frets.length; index++) {
    let element = findFifthRope.frets[index];

    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignFifthRowKeys?.length) {
        element.key = assignFifthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    } else {
      element.key = undefined;
    }

    if (lockTheZeroChord === true && startFromTheChord === 0) {
      startFromTheChord = 1;
    }

    if (index === 0 && lockTheZeroChord === true) {
      const elementKey =
        assignFifthRowKeys?.[0] !== undefined ? assignFifthRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }
      console.log(elementKey);
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignFifthRowKeys?.length) {
          element.key = assignFifthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }
    }
  }

  for (let index = 0; index < findSixthRope.frets.length; index++) {
    let element = findSixthRope.frets[index];

    if (index >= startFromTheChord && lockTheZeroChord === false) {
      if (index <= assignSixthRowKeys?.length) {
        element.key = assignSixthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    } else {
      element.key = undefined;
    }

    if (lockTheZeroChord === true && startFromTheChord === 0) {
      startFromTheChord = 1;
    }

    if (index === 0 && lockTheZeroChord === true) {
      const elementKey =
        assignSixthRowKeys?.[0] !== undefined ? assignSixthRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }
      console.log(elementKey);
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index <= assignSixthRowKeys?.length) {
          element.key = assignSixthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }
    }
  }

  // Devuelve un nuevo arreglo que contendrá un objeto por cada una de las cuerdas encontradas
  return [
    { ...findFirstRope },
    { ...findSecondRope },
    { ...findThirdRope },
    { ...findFourthRope },
    { ...findFifthRope },
    { ...findSixthRope },
  ];
};

// NO ASIGNAR EL ARGUMENTO 0 EN startFromTheChord si tiene true el argumento lockTheZeroChord
console.log(
  dynamicAlgoritm3(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 3, false, true)
);

// RESULTADO
// [
//   {
//     rope: 1,
//     frets: [
//       { id: 100, chord: 0, file: "1-0", key: "1" },
//       { id: 101, chord: 1, file: "1-1", key: undefined },
//       { id: 102, chord: 2, file: "1-2", key: undefined },
//       { id: 103, chord: 3, file: "1-3", key: "2" },
//       { id: 104, chord: 4, file: "1-4", key: "3" },
//       { id: 105, chord: 5, file: "1-5", key: "4" },
//       { id: 106, chord: 6, file: "1-6", key: "5" },
//     ],
//   },
//   {
//     rope: 2,
//     frets: [
//       { id: 200, chord: 0, file: "2-0", key: "q" },
//       { id: 201, chord: 1, file: "2-1", key: undefined },
//       { id: 202, chord: 2, file: "2-2", key: undefined },
//       { id: 203, chord: 3, file: "2-3", key: "w" },
//       { id: 204, chord: 4, file: "2-4", key: "e" },
//       { id: 205, chord: 5, file: "2-5", key: "r" },
//       { id: 206, chord: 6, file: "2-6", key: "t" },
//     ],
//   },
//   {
//     rope: 3,
//     frets: [
//       { id: 300, chord: 0, file: "3-0", key: "a" },
//       { id: 301, chord: 1, file: "3-1", key: undefined },
//       { id: 302, chord: 2, file: "3-2", key: undefined },
//       { id: 303, chord: 3, file: "3-3", key: "s" },
//       { id: 304, chord: 4, file: "3-4", key: "d" },
//       { id: 305, chord: 5, file: "3-5", key: "f" },
//       { id: 306, chord: 6, file: "3-6", key: "g" },
//     ],
//   },
//   {
//     rope: 4,
//     frets: [
//       { id: 400, chord: 0, file: "4-0", key: "z" },
//       { id: 401, chord: 1, file: "4-1", key: undefined },
//       { id: 402, chord: 2, file: "4-2", key: undefined },
//       { id: 403, chord: 3, file: "4-3", key: "x" },
//       { id: 404, chord: 4, file: "4-4", key: "c" },
//       { id: 405, chord: 5, file: "4-5", key: "v" },
//       { id: 406, chord: 6, file: "4-6", key: "b" },
//     ],
//   },
//   {
//     rope: 5,
//     frets: [
//       { id: 500, chord: 0, file: "5-0", key: undefined },
//       { id: 501, chord: 1, file: "5-1", key: undefined },
//       { id: 502, chord: 2, file: "5-2", key: undefined },
//       { id: 503, chord: 3, file: "5-3", key: undefined },
//       { id: 504, chord: 4, file: "5-4", key: undefined },
//       { id: 505, chord: 5, file: "5-5", key: undefined },
//       { id: 506, chord: 6, file: "5-6", key: undefined },
//     ],
//   },
//   {
//     rope: 6,
//     frets: [
//       { id: 600, chord: 0, file: "6-0", key: undefined },
//       { id: 601, chord: 1, file: "6-1", key: undefined },
//       { id: 602, chord: 2, file: "6-2", key: undefined },
//       { id: 603, chord: 3, file: "6-3", key: undefined },
//       { id: 604, chord: 4, file: "6-4", key: undefined },
//       { id: 605, chord: 5, file: "6-5", key: undefined },
//       { id: 606, chord: 6, file: "6-6", key: undefined },
//     ],
//   },
// ];

console.log(
  dynamicAlgoritm3(1, 2, 3, 4, 5, 6, 4, 0, 1, 2, 3, 5, 2, false, true)
);
// RESULTADO
// [
//   {
//     rope: 1,
//     frets: [
//       { id: 100, chord: 0, file: "1-0", key: undefined },
//       { id: 101, chord: 1, file: "1-1", key: undefined },
//       { id: 102, chord: 2, file: "1-2", key: undefined },
//       { id: 103, chord: 3, file: "1-3", key: undefined },
//       { id: 104, chord: 4, file: "1-4", key: undefined },
//       { id: 105, chord: 5, file: "1-5", key: undefined },
//       { id: 106, chord: 6, file: "1-6", key: undefined },
//     ],
//   },
//   {
//     rope: 2,
//     frets: [
//       { id: 200, chord: 0, file: "2-0", key: "1" },
//       { id: 201, chord: 1, file: "2-1", key: undefined },
//       { id: 202, chord: 2, file: "2-2", key: "2" },
//       { id: 203, chord: 3, file: "2-3", key: "3" },
//       { id: 204, chord: 4, file: "2-4", key: "4" },
//       { id: 205, chord: 5, file: "2-5", key: "5" },
//       { id: 206, chord: 6, file: "2-6", key: "6" },
//     ],
//   },
//   {
//     rope: 3,
//     frets: [
//       { id: 300, chord: 0, file: "3-0", key: "q" },
//       { id: 301, chord: 1, file: "3-1", key: undefined },
//       { id: 302, chord: 2, file: "3-2", key: "w" },
//       { id: 303, chord: 3, file: "3-3", key: "e" },
//       { id: 304, chord: 4, file: "3-4", key: "r" },
//       { id: 305, chord: 5, file: "3-5", key: "t" },
//       { id: 306, chord: 6, file: "3-6", key: "y" },
//     ],
//   },
//   {
//     rope: 4,
//     frets: [
//       { id: 400, chord: 0, file: "4-0", key: "a" },
//       { id: 401, chord: 1, file: "4-1", key: undefined },
//       { id: 402, chord: 2, file: "4-2", key: "s" },
//       { id: 403, chord: 3, file: "4-3", key: "d" },
//       { id: 404, chord: 4, file: "4-4", key: "f" },
//       { id: 405, chord: 5, file: "4-5", key: "g" },
//       { id: 406, chord: 6, file: "4-6", key: "h" },
//     ],
//   },
//   {
//     rope: 5,
//     frets: [
//       { id: 500, chord: 0, file: "5-0", key: "z" },
//       { id: 501, chord: 1, file: "5-1", key: undefined },
//       { id: 502, chord: 2, file: "5-2", key: "x" },
//       { id: 503, chord: 3, file: "5-3", key: "c" },
//       { id: 504, chord: 4, file: "5-4", key: "v" },
//       { id: 505, chord: 5, file: "5-5", key: "b" },
//       { id: 506, chord: 6, file: "5-6", key: "n" },
//     ],
//   },
//   {
//     rope: 6,
//     frets: [
//       { id: 600, chord: 0, file: "6-0", key: undefined },
//       { id: 601, chord: 1, file: "6-1", key: undefined },
//       { id: 602, chord: 2, file: "6-2", key: undefined },
//       { id: 603, chord: 3, file: "6-3", key: undefined },
//       { id: 604, chord: 4, file: "6-4", key: undefined },
//       { id: 605, chord: 5, file: "6-5", key: undefined },
//       { id: 606, chord: 6, file: "6-6", key: undefined },
//     ],
//   },
// ];

console.log(
  dynamicAlgoritm3(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, 4, true, true)
);
// RESULTADO
// [
//   {
//     rope: 1,
//     frets: [
//       { id: 100, chord: 0, file: "1-0", key: undefined },
//       { id: 101, chord: 1, file: "1-1", key: undefined },
//       { id: 102, chord: 2, file: "1-2", key: undefined },
//       { id: 103, chord: 3, file: "1-3", key: undefined },
//       { id: 104, chord: 4, file: "1-4", key: undefined },
//       { id: 105, chord: 5, file: "1-5", key: undefined },
//       { id: 106, chord: 6, file: "1-6", key: undefined },
//     ],
//   },
//   {
//     rope: 2,
//     frets: [
//       { id: 200, chord: 0, file: "2-0", key: undefined },
//       { id: 201, chord: 1, file: "2-1", key: undefined },
//       { id: 202, chord: 2, file: "2-2", key: undefined },
//       { id: 203, chord: 3, file: "2-3", key: undefined },
//       { id: 204, chord: 4, file: "2-4", key: undefined },
//       { id: 205, chord: 5, file: "2-5", key: undefined },
//       { id: 206, chord: 6, file: "2-6", key: undefined },
//     ],
//   },
//   {
//     rope: 3,
//     frets: [
//       { id: 300, chord: 0, file: "3-0", key: "z" },
//       { id: 301, chord: 1, file: "3-1", key: undefined },
//       { id: 302, chord: 2, file: "3-2", key: undefined },
//       { id: 303, chord: 3, file: "3-3", key: undefined },
//       { id: 304, chord: 4, file: "3-4", key: "x" },
//       { id: 305, chord: 5, file: "3-5", key: "c" },
//       { id: 306, chord: 6, file: "3-6", key: "v" },
//     ],
//   },
//   {
//     rope: 4,
//     frets: [
//       { id: 400, chord: 0, file: "4-0", key: "a" },
//       { id: 401, chord: 1, file: "4-1", key: undefined },
//       { id: 402, chord: 2, file: "4-2", key: undefined },
//       { id: 403, chord: 3, file: "4-3", key: undefined },
//       { id: 404, chord: 4, file: "4-4", key: "s" },
//       { id: 405, chord: 5, file: "4-5", key: "d" },
//       { id: 406, chord: 6, file: "4-6", key: "f" },
//     ],
//   },
//   {
//     rope: 5,
//     frets: [
//       { id: 500, chord: 0, file: "5-0", key: "q" },
//       { id: 501, chord: 1, file: "5-1", key: undefined },
//       { id: 502, chord: 2, file: "5-2", key: undefined },
//       { id: 503, chord: 3, file: "5-3", key: undefined },
//       { id: 504, chord: 4, file: "5-4", key: "w" },
//       { id: 505, chord: 5, file: "5-5", key: "e" },
//       { id: 506, chord: 6, file: "5-6", key: "r" },
//     ],
//   },
//   {
//     rope: 6,
//     frets: [
//       { id: 600, chord: 0, file: "6-0", key: "1" },
//       { id: 601, chord: 1, file: "6-1", key: undefined },
//       { id: 602, chord: 2, file: "6-2", key: undefined },
//       { id: 603, chord: 3, file: "6-3", key: undefined },
//       { id: 604, chord: 4, file: "6-4", key: "2" },
//       { id: 605, chord: 5, file: "6-5", key: "3" },
//       { id: 606, chord: 6, file: "6-6", key: "4" },
//     ],
//   },
// ];
