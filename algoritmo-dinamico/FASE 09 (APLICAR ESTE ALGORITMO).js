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

// Número de teclas asignadas por cada fila del teclado (restamos 1 porque los índices comienzan desde 0)
const keysByRow = 3 - 1;

// Función auxiliar
const handler = (startFromTheChord, invertKeyboard, lockTheZeroChord) => {
  // Itera sobre cada cuerda en el arreglo inicial
  for (let index = 0; index < initialArray.length; index++) {
    // Calcula el número de la cuerda sumándole 1 al índice de la cuerda
    const element = initialArray[index] + 1;

    // Determina las teclas asignadas a la primera fila de la cuerda, invirtiendo si es necesario
    let assignFirstRowKeys =
      invertKeyboard === false
        ? keyboardKeys[initialArray[index]]?.keys
        : keyboardKeys[keyboardKeys.length - 1 - initialArray[index]]?.keys;

    // Busca el objeto de la cuerda actual en el mástil de la guitarra
    let findFirstRope = guitarNeck.find((n) => n.rope === element);

    // Itera sobre cada traste (fret) en la cuerda actual
    for (let index = 0; index < findFirstRope.frets.length; index++) {
      let element = findFirstRope.frets[index];

      // Asigna teclas a partir del traste especificado, respetando las opciones de bloqueo
      if (index >= startFromTheChord && lockTheZeroChord === false) {
        if (index <= assignFirstRowKeys?.length) {
          element.key = assignFirstRowKeys[index - startFromTheChord];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = undefined;
      }

      // Bloqueo del traste cero si la opción lockTheZeroChord está activada
      if (lockTheZeroChord === true && startFromTheChord === 0) {
        startFromTheChord = 1;
      }

      // Asigna la tecla al primer traste (cero) si lockTheZeroChord está activado
      if (index === 0 && lockTheZeroChord === true) {
        const elementKey =
          assignFirstRowKeys?.[0] !== undefined ? assignFirstRowKeys?.[0] : "";
        if (elementKey) {
          element.key = elementKey;
        }
        continue; // Pasa al siguiente traste
      }

      // Asigna teclas a los trastes restantes si lockTheZeroChord está activado
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

      // Oculta teclas en los trastes por debajo de startFromTheChord si lockTheZeroChord está desactivado
      if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
        element.key = "ESTO SE DEBE OCULTAR";
      }

      // Oculta teclas si el índice excede el límite de teclas por fila
      if (index > keysByRow) {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }
  }
};

const assignKeysToFrets = (
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  startFromTheChord,
  invertKeyboard,
  lockTheZeroChord
) => {
  // Define el arreglo inicial con las cuerdas especificadas
  let initialArray = [first, second, third, fourth, fifth, sixth];

  // Condiciones para ajustar el arreglo en caso de que ciertas cuerdas no estén definidas
  if (sixth == null) {
    initialArray = [first, second, third, fourth, fifth];
  }

  if (fifth == null && sixth == null) {
    initialArray = [first, second, third, fourth];
  }

  // Inicializa un arreglo vacío para almacenar los resultados procesados de cada cuerda
  let resultArray = [];

  // Llama a la función auxiliar para asignar teclas a los trastes de la cuerda actual
  handler(startFromTheChord, invertKeyboard, lockTheZeroChord);

  // Filtra los trastes visibles y descarta los que están ocultos
  let newFrets = findFirstRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  // Agrega el objeto de la cuerda procesada al arreglo de resultados usando el operador spread
  resultArray = [...resultArray, { rope: findFirstRope.rope, frets: newFrets }];

  // Retorna el arreglo completo de cuerdas procesadas
  return resultArray;
};

// Ejemplo de ejecución del algoritmo con ciertos parámetros iniciales
console.log(algoritm(0, 1, 2, 3, 4, 5, 1, true, true));
