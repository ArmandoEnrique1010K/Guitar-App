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
    keys: ["1", "2", "3"],
  },
  {
    row: 2,
    keys: ["q", "w", "e"],
  },
  {
    row: 3,
    keys: ["a", "s", "d"],
  },
  {
    row: 4,
    keys: ["z", "x", "c"],
  },
];

// CONSTANTES ESTATICAS QUE NO CAMBIAN
// Numero de teclas por cada fila del teclado (se resta 1s)
const keysByRow = 3 - 1;

// ALGORITMO SIMPLIFICADO A UNA CUERDA
const algoritm = (
  firstRowKeys,
  startFromTheChord,
  invertKeyboard,
  lockTheZeroChord
) => {
  // Invertir las teclas si invertKeyboard es true
  let assignFirstRowKeys =
    invertKeyboard === false
      ? keyboardKeys[firstRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - firstRowKeys]?.keys;

  for (let index = 0; index < guitarNeck.length; index++) {
    const element = guitarNeck[index];

    let findFirstRope = guitarNeck.find((n) => n.rope === element.rope);

    for (let index = 0; index < findFirstRope.frets.length; index++) {
      let element = findFirstRope.frets[index];

      if (index >= startFromTheChord && lockTheZeroChord === false) {
        if (index <= assignFirstRowKeys?.length) {
          element.key = assignFirstRowKeys[index - startFromTheChord];
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
          assignFirstRowKeys?.[0] !== undefined ? assignFirstRowKeys?.[0] : "";
        if (elementKey) {
          element.key = elementKey;
        }
        continue;
      }

      if (index !== 0 && lockTheZeroChord === true) {
        if (index >= startFromTheChord) {
          if (index < assignFirstRowKeys?.length) {
            element.key = assignFirstRowKeys[index - startFromTheChord + 1];
          } else {
            element.key = undefined;
          }
        } else {
          element.key = "ESTO SE DEBE OCULTAR";
        }
      }

      if (index > keysByRow) {
        element.key = "ESTO SE DEBE OCULTAR";
      }

      if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    let newFirstRope = element.frets.filter(
      (x) => x.key !== "ESTO SE DEBE OCULTAR"
    );

    return [{ rope: findFirstRope.rope, frets: { ...newFirstRope } }];
  }
};

const dynamicAlgoritm = (
  // Fila de teclas (6 numeros)
  firstRowKeys,
  /*
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  fifthRowKeys,
  sixthRowKeys,
  */
  // Empezar desde el acorde (numero)
  startFromTheChord,
  // Invertir las teclas (booleano)
  invertKeyboard,
  // Bloquear el acorde cero (booleano)
  lockTheZeroChord
) => {
  // Asigna las teclas correspondientes de cada fila del teclado.
  // Utiliza el operador optional chaining para que devuelva undefined si no existe aquella propiedad en lugar de devolver un error
  // Utiliza un operador ternario para aplicar el parametro de invertir teclas

  // Estas 6 variables se encarga de asignar las teclas si invertKeyboard esta en false o true
  let assignFirstRowKeys =
    invertKeyboard === false
      ? keyboardKeys[firstRowKeys]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - firstRowKeys]?.keys;

  /*
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
*/

  // Encuentra la cuerda específica en el objeto 'guitarNeck' (mástil de la guitarra).
  let findFirstRope = guitarNeck.find((n) => n.rope === 1);
  /*
  let findSecondRope = guitarNeck.find((n) => n.rope === 2);
  let findThirdRope = guitarNeck.find((n) => n.rope === 3);
  let findFourthRope = guitarNeck.find((n) => n.rope === 4);
  let findFifthRope = guitarNeck.find((n) => n.rope === 5);
  let findSixthRope = guitarNeck.find((n) => n.rope === 6);
*/
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
        // if (index <= assignFirstRowKeys?.length) {
        if (index < assignFirstRowKeys?.length) {
          // Asigna la tecla correspondiente
          element.key = assignFirstRowKeys[index - startFromTheChord + 1];
        } else {
          // Si no hay tecla, asigna undefined
          element.key = undefined;
          //   if (index > 2) {
          //     element.key = "OCULTAR";
          //   }
        }
      } else {
        // Si el índice es menor que startFromTheChord, asigna undefined
        // element.key = undefined;
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    // MAYOR AL NUMERO DE TECLAS ASIGNADAS
    if (index > keysByRow) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    // OCULTAR LAS TECLAS QUE SE ENCUENTRAN A LA IZQUIERDA
    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  let newFirstRope = findFirstRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  /*
  let newSecondRope = findSecondRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  let newThirdRope = findThirdRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFourthRope = findFourthRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFifthRope = findFifthRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  let newSixthRope = findSixthRope.frets.filter(
    (x) => x.key !== "ESTO SE DEBE OCULTAR"
  );

  */
  return [
    { rope: findFirstRope.rope, frets: { ...newFirstRope } },
    /*
    { rope: findSecondRope.rope, frets: { ...newSecondRope } },
    { rope: findThirdRope.rope, frets: { ...newThirdRope } },
    { rope: findFourthRope.rope, frets: { ...newFourthRope } },
    { rope: findFifthRope.rope, frets: { ...newFifthRope } },
    { rope: findSixthRope.rope, frets: { ...newSixthRope } },
*/
    // { ...newFirstRope },
    // { ...findFirstRope },
    // { ...findSecondRope },
    // { ...findThirdRope },
    // { ...findFourthRope },
    // { ...findFifthRope },
    // { ...findSixthRope },
  ];
};

// console.log(dynamicAlgoritm(0, 1, 2, 3, 4, 5, 0, false, false));
// console.log(dynamicAlgoritm(0, 2, false, true));

console.log(algoritm(3, 0, false, true));
// console.log(algoritm2(0, 2, false, true));
