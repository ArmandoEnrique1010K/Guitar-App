import { cleanSoloNotes } from "./cleanSoloNotes";
import { keyboardKeys } from "./keyboardKeys";

const keysByRow = 11 - 1;

// Función auxiliar para asignar teclas a los trastes de una cuerda
export const assignKeysToFrets = (
  file,
  row1,
  row2,
  row3,
  row4,
  row5,
  row6,
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

  let orderRopes = [row1, row2, row3, row4, row5, row6].filter(
    (r) => r != null
  );

  let initialArray = [first, second, third, fourth, fifth, sixth].filter(
    (v) => v != null
  );

  // Inicializa un arreglo vacío para almacenar los resultados procesados de cada cuerda
  let resultArray = [];

  // Función para obtener la fila de teclas asignada a una cuerda específica
  const getKeysForRow = (index) => {
    return invertKeyboard === false
      ? keyboardKeys[initialArray[index]]?.keys
      : keyboardKeys[keyboardKeys.length - 1 - initialArray[index]]?.keys;
    /*
    const rowKeys = keyboardKeys[index]?.keys || [];
    return invertKeyboard ? [...rowKeys].reverse() : rowKeys;
    */
  };

  // Itera sobre cada cuerda en el arreglo inicial
  for (let index = 0; index < initialArray.length; index++) {
    // Calcula el número de la cuerda sumándole 1 al índice de la cuerda
    const ropeNumber = initialArray[index] + 1;

    const assignRowKeys = getKeysForRow(index);

    // Busca el objeto de la cuerda actual en el mástil de la guitarra
    let findThisRope = [];
    findThisRope = findRope.find((n) => n.rope === ropeNumber);

    // Itera sobre cada traste (fret) en la cuerda actual
    for (let index = 0; index < findThisRope.frets.length; index++) {
      let element = findThisRope.frets[index];

      // Asigna teclas a partir del traste especificado, respetando las opciones de bloqueo
      if (index >= startFromTheChord && lockTheZeroChord === false) {
        if (index <= assignRowKeys?.length) {
          element.key = assignRowKeys[index - startFromTheChord];
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
          assignRowKeys?.[0] !== undefined ? assignRowKeys?.[0] : "";
        if (elementKey) {
          element.key = elementKey;
        }
        continue; // Pasa al siguiente traste
      }

      // Asigna teclas a los trastes restantes si lockTheZeroChord está activado
      if (index !== 0 && lockTheZeroChord === true) {
        if (index >= startFromTheChord) {
          if (index < assignRowKeys?.length + keysByRow + 2) {
            // MEJORAR ESTO
            element.key =
              assignRowKeys[index - startFromTheChord + 1] === undefined
                ? "ESTO SE DEBE OCULTAR"
                : assignRowKeys[index - startFromTheChord + 1];
          } else {
            // element.key = undefined;
            element.key = "UNDEFINED";
          }
        } else {
          element.key = "ESTO SE DEBE OCULTAR";
        }
      }

      if (lockTheZeroChord === false) {
        if (index <= assignRowKeys?.length + keysByRow + 1) {
          // MEJORAR ESTO
          element.key = assignRowKeys[index - startFromTheChord];
        } else {
          element.key = undefined;
        }
      }

      // Oculta teclas en los trastes por debajo de startFromTheChord si lockTheZeroChord está desactivado
      if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
        element.key = "ESTO SE DEBE OCULTAR";
      }

      // Oculta teclas si el índice excede el límite de teclas por fila
      if (index > keysByRow + startFromTheChord) {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }
  }

  for (let index = 0; index < orderRopes.length; index++) {
    const ropeNumber = orderRopes[index];
    //  console.log(ropeNumber);
    let newFrets = findRope[ropeNumber].frets.filter(
      (f) => f.key !== "ESTO SE DEBE OCULTAR"
    );

    // console.log(newFrets);
    // console.log(newFrets);
    // Agrega el objeto de la cuerda procesada al arreglo de resultados usando el operador spread
    resultArray = [
      ...resultArray,
      { rope: findRope[ropeNumber].rope, frets: newFrets },
    ];
  }

  // Filtra los trastes visibles y descarta los que están ocultos

  // Retorna el arreglo completo de cuerdas procesadas
  // console.log(resultArray);
  return resultArray;
};
console.log(
  assignKeysToFrets(
    cleanSoloNotes,
    // Filas de teclado para cada cuerda (FUNCIONA BIEN)
    5,
    4,
    3,
    2,
    1,
    0,
    // Cuerdas a asignar
    1,
    2,
    3,
    4,
    5,
    0,

    /*
    3,
    2,
    1,
    0,
    4,
    5,
    */
    // Traste inicial
    0,
    // Invertir teclado
    false,
    // Bloqueo del traste cero
    false
  )
);

// 13 es el limite
