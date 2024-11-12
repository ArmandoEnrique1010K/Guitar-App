import { keyboardKeys } from "../data/keyboardKeys";

// Número de teclas asignadas por cada fila del teclado (restamos 1 porque los índices comienzan desde 0)
const keysByRow = 11 - 1;

// Función para encontrar el archivo que contiene las notas
/*
export const findDataNotes = (file) => {
  return file;
};
*/

// Función auxiliar para asignar teclas a los trastes de una cuerda
export const assignKeysToFrets = (
  file,
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
  //
  let findRope = file;
  // Define el arreglo inicial con las cuerdas especificadas
  // let initialArray = [first, second, third, fourth, fifth, sixth];

  // Condiciones para ajustar el arreglo en caso de que ciertas cuerdas no estén definidas
  /*
  if (sixth == null) {
    initialArray = [first, second, third, fourth, fifth];
  }

  if (fifth == null && sixth == null) {
    initialArray = [first, second, third, fourth];
  }
*/

  let initialArray = [first, second, third, fourth, fifth, sixth].filter(
    (v) => v != null
  );

  // Inicializa un arreglo vacío para almacenar los resultados procesados de cada cuerda
  let resultArray = [];

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
    let findThisRope = [];
    findThisRope = findRope.find((n) => n.rope === element);

    // Itera sobre cada traste (fret) en la cuerda actual
    for (let index = 0; index < findThisRope.frets.length; index++) {
      let element = findThisRope.frets[index];

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

  for (let index = 0; index < initialArray.length; index++) {
    const element = initialArray[index];
    let newFrets = findRope[element].frets.filter(
      (f) => f.key !== "ESTO SE DEBE OCULTAR"
    );
    // console.log(newFrets);
    // Agrega el objeto de la cuerda procesada al arreglo de resultados usando el operador spread
    resultArray = [
      ...resultArray,
      { rope: findRope[element].rope, frets: newFrets },
    ];
  }

  // Filtra los trastes visibles y descarta los que están ocultos

  // Retorna el arreglo completo de cuerdas procesadas
  // console.log(resultArray);
  return resultArray;
};

// Función auxiliar
/*
export const handler = (
  // file,
  findRope,
  initialArray,
  startFromTheChord,
  invertKeyboard,
  lockTheZeroChord
) => {
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
    let findThisRope = [];
    findThisRope = findRope.find((n) => n.rope === element);

    // Itera sobre cada traste (fret) en la cuerda actual
    for (let index = 0; index < findThisRope.frets.length; index++) {
      let element = findThisRope.frets[index];

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
*/
// Ejemplo de ejecución del algoritmo con ciertos parámetros iniciales
// console.log(algoritm(0, 1, 2, 3, 4, 5, 1, true, true));
