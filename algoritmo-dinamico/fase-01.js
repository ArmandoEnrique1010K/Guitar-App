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
  {
    row: 5,
    keys: [],
  },
  {
    row: 6,
    keys: [],
  },
];

// DEVOLVER UN NUEVO ARREGLO QUE CONTENGA LAS TECLAS ASIGNADAS A CADA NOTA Y QUE PUEDA EMPEZAR DESDE UNA FILA DE CUERDAS
const dynamicAlgoritm1 = (
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
  startFromTheChord
) => {
  // Asigna las teclas correspondientes de cada fila del teclado.
  let assignFirstRowKeys = keyboardKeys[firstRowKeys].keys;
  let assignSecondRowKeys = keyboardKeys[secondRowKeys].keys;
  let assignThirdRowKeys = keyboardKeys[thirdRowKeys].keys;
  let assignFourthRowKeys = keyboardKeys[fourthRowKeys].keys;
  let assignFifthRowKeys = keyboardKeys[fifthRowKeys].keys;
  let assignSixthRowKeys = keyboardKeys[sixthRowKeys].keys;

  // Encuentra la cuerda específica en el objeto 'guitarNeck' (mástil de la guitarra).
  let findFirstRope = guitarNeck.find((n) => n.rope === firstRope);
  let findSecondRope = guitarNeck.find((n) => n.rope === secondRope);
  let findThirdRope = guitarNeck.find((n) => n.rope === thirdRope);
  let findFourthRope = guitarNeck.find((n) => n.rope === fourthRope);
  let findFifthRope = guitarNeck.find((n) => n.rope === fifthRope);
  let findSixthRope = guitarNeck.find((n) => n.rope === sixthRope);

  // Asigna las teclas a los trastes de la primera cuerda desde el índice especificado por 'startFromTheChord'.
  for (let index = 0; index < findFirstRope.frets.length; index++) {
    let element = findFirstRope.frets[index];

    // Solo asignar teclas si el índice es mayor o igual a 'startFromTheChord' y está dentro del rango de la fila de teclas.
    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFirstRowKeys.length
    ) {
      element.key = assignFirstRowKeys[index - startFromTheChord];
    } else {
      // Si no hay teclas disponibles, dejar la propiedad 'key' indefinida.
      element.key = undefined;
    }
  }

  // Repite el mismo procedimiento para las demás cuerdas
  for (let index = 0; index < findSecondRope.frets.length; index++) {
    let element = findSecondRope.frets[index];

    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignSecondRowKeys.length
    ) {
      element.key = assignSecondRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }

  for (let index = 0; index < findThirdRope.frets.length; index++) {
    let element = findThirdRope.frets[index];

    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignThirdRowKeys.length
    ) {
      element.key = assignThirdRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }

  for (let index = 0; index < findFourthRope.frets.length; index++) {
    let element = findFourthRope.frets[index];

    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFourthRowKeys.length
    ) {
      element.key = assignFourthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }

  for (let index = 0; index < findFifthRope.frets.length; index++) {
    let element = findFifthRope.frets[index];

    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignFifthRowKeys.length
    ) {
      element.key = assignFifthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
    }
  }

  for (let index = 0; index < findSixthRope.frets.length; index++) {
    let element = findSixthRope.frets[index];

    if (
      index >= startFromTheChord &&
      index - startFromTheChord < assignSixthRowKeys.length
    ) {
      element.key = assignSixthRowKeys[index - startFromTheChord];
    } else {
      element.key = undefined;
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

console.log(dynamicAlgoritm1(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0));

// RESULTADO:
// [
//   {
//     rope: 1,
//     frets: [
//       { id: 100, chord: 0, file: "1-0", key: "1" },
//       { id: 101, chord: 1, file: "1-1", key: "2" },
//       { id: 102, chord: 2, file: "1-2", key: "3" },
//       { id: 103, chord: 3, file: "1-3", key: "4" },
//     ],
//   },
//   {
//     rope: 2,
//     frets: [
//       { id: 200, chord: 0, file: "2-0", key: "q" },
//       { id: 201, chord: 1, file: "2-1", key: "w" },
//       { id: 202, chord: 2, file: "2-2", key: "e" },
//       { id: 203, chord: 3, file: "2-3", key: "r" },
//     ],
//   },
//   {
//     rope: 3,
//     frets: [
//       { id: 300, chord: 0, file: "3-0", key: "a" },
//       { id: 301, chord: 1, file: "3-1", key: "s" },
//       { id: 302, chord: 2, file: "3-2", key: "d" },
//       { id: 303, chord: 3, file: "3-3", key: "f" },
//     ],
//   },
//   {
//     rope: 4,
//     frets: [
//       { id: 400, chord: 0, file: "4-0", key: "z" },
//       { id: 401, chord: 1, file: "4-1", key: "x" },
//       { id: 402, chord: 2, file: "4-2", key: "c" },
//       { id: 403, chord: 3, file: "4-3", key: "v" },
//     ],
//   },
//   {
//     rope: 5,
//     frets: [
//       { id: 500, chord: 0, file: "5-0", key: undefined },
//       { id: 501, chord: 1, file: "5-1", key: undefined },
//       { id: 502, chord: 2, file: "5-2", key: undefined },
//       { id: 503, chord: 3, file: "5-3", key: undefined },
//     ],
//   },
//   {
//     rope: 6,
//     frets: [
//       { id: 600, chord: 0, file: "6-0", key: undefined },
//       { id: 601, chord: 1, file: "6-1", key: undefined },
//       { id: 602, chord: 2, file: "6-2", key: undefined },
//       { id: 603, chord: 3, file: "6-3", key: undefined },
//     ],
//   },
// ];

console.log(dynamicAlgoritm1(1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 2));
// RESULTADO
// [
//   {
//     rope: 1,
//     frets: [
//       { id: 100, chord: 0, file: "1-0", key: undefined },
//       { id: 101, chord: 1, file: "1-1", key: undefined },
//       { id: 102, chord: 2, file: "1-2", key: undefined },
//       { id: 103, chord: 3, file: "1-3", key: undefined },
//     ],
//   },
//   {
//     rope: 2,
//     frets: [
//       { id: 200, chord: 0, file: "2-0", key: undefined },
//       { id: 201, chord: 1, file: "2-1", key: undefined },
//       { id: 202, chord: 2, file: "2-2", key: undefined },
//       { id: 203, chord: 3, file: "2-3", key: undefined },
//     ],
//   },
//   {
//     rope: 3,
//     frets: [
//       { id: 300, chord: 0, file: "3-0", key: undefined },
//       { id: 301, chord: 1, file: "3-1", key: undefined },
//       { id: 302, chord: 2, file: "3-2", key: "z" },
//       { id: 303, chord: 3, file: "3-3", key: "x" },
//     ],
//   },
//   {
//     rope: 4,
//     frets: [
//       { id: 400, chord: 0, file: "4-0", key: undefined },
//       { id: 401, chord: 1, file: "4-1", key: undefined },
//       { id: 402, chord: 2, file: "4-2", key: "a" },
//       { id: 403, chord: 3, file: "4-3", key: "s" },
//     ],
//   },
//   {
//     rope: 5,
//     frets: [
//       { id: 500, chord: 0, file: "5-0", key: undefined },
//       { id: 501, chord: 1, file: "5-1", key: undefined },
//       { id: 502, chord: 2, file: "5-2", key: "q" },
//       { id: 503, chord: 3, file: "5-3", key: "w" },
//     ],
//   },
//   {
//     rope: 6,
//     frets: [
//       { id: 600, chord: 0, file: "6-0", key: undefined },
//       { id: 601, chord: 1, file: "6-1", key: undefined },
//       { id: 602, chord: 2, file: "6-2", key: "1" },
//       { id: 603, chord: 3, file: "6-3", key: "2" },
//     ],
//   },
// ];
