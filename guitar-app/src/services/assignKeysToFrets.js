// Este es un algoritmo dinamico que escribi durante un mes para poder asignar una tecla a cada nota de la guitarra
// Utilice la extensión de Quokka para realizar pruebas hasta llegar a este algoritmo dinamico

// Importa la data en keyboardKeys (el arreglo que contiene las filas del teclado)
import { keyboardKeys } from "../data/keyboardKeys";

// Número de teclas asignadas por cada fila del teclado (restamos 1 para manejar índices correctamente)
const keysByRow = 11 - 1;

// Función principal para asignar teclas a los trastes de las cuerdas de la guitarra
export const assignKeysToFrets = (
  // Parámetros para personalizar las asignaciones de teclas y opciones de configuración
  file = [],
  // Cuerdas específicas de la guitarra
  firstRope,
  secondRope,
  thirdRope,
  fourthRope,
  fifthRope,
  sixthRope,
  // Fila de teclas asociada a cada cuerda
  firstRowKeys,
  secondRowKeys,
  thirdRowKeys,
  fourthRowKeys,
  fifthRowKeys,
  sixthRowKeys,
  // Primer traste para empezar la asignación de teclas
  startFromTheChord,
  // Booleano para bloquear el traste 0 (evita modificar el primer acorde)
  lockTheZeroChord,
  // Booleano para invertir el orden de las filas del teclado
  invertKeyboard
) => {
  // Asignación de filas de teclas de acuerdo a la opción de inversión
  let assignFirstRowKeys =
    invertKeyboard === false
      ? // Asigna la fila especificada
        keyboardKeys[firstRowKeys]?.keys
      : // Inverte el orden de las teclas si invertKeyboard es tru
        keyboardKeys[keyboardKeys.length - 1 - firstRowKeys]?.keys;
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

  // Encuentra cada cuerda específica en el arreglo `file` utilizando `find` para obtener cada objeto de cuerda por su propiedad `rope`
  let findFirstRope = file.find((n) => n.rope === firstRope);
  let findSecondRope = file.find((n) => n.rope === secondRope);
  let findThirdRope = file.find((n) => n.rope === thirdRope);
  let findFourthRope = file.find((n) => n.rope === fourthRope);
  let findFifthRope = file.find((n) => n.rope === fifthRope);
  let findSixthRope = file.find((n) => n.rope === sixthRope);

  // PRIMERA CUERDA
  // Asigna teclas a los trastes de la primera cuerda comenzando desde el índice `startFromTheChord`
  for (let index = 0; index < findFirstRope.frets.length; index++) {
    // Toma el traste actual
    let element = findFirstRope.frets[index];

    // Asignación de tecla si `lockTheZeroChord` está en false
    if (index >= startFromTheChord && lockTheZeroChord === false) {
      // Asigna la tecla de la fila correspondiente, si existe
      if (index <= assignFirstRowKeys?.length) {
        element.key = assignFirstRowKeys[index - startFromTheChord];
      } else {
        // Si no hay tecla, asigna undefined
        element.key = undefined;
      }
    } else {
      // Si `lockTheZeroChord` está en true, asigna undefined al traste
      element.key = undefined;
    }

    // Evita asignar el acorde 0 si `lockTheZeroChord` está en true y `startFromTheChord` es 0
    if (lockTheZeroChord === true && startFromTheChord === 0) {
      // Cambia a 1 para evitar asignación en el traste 0
      startFromTheChord = 1;
    }

    // Esto no funciona???
    // if (lockTheZeroChord === false && startFromTheChord === 13) {
    //   startFromTheChord = 12;
    // }

    // Bloqueo específico del traste 0 si `lockTheZeroChord` está en true
    if (index === 0 && lockTheZeroChord === true) {
      // Asigna la primera tecla de la fila solo si existe
      const elementKey =
        assignFirstRowKeys?.[0] !== undefined ? assignFirstRowKeys?.[0] : "";
      if (elementKey) {
        element.key = elementKey;
      }

      // Pasa a la siguiente iteración del bucle
      continue;
    }

    // Comportamiento para trastes diferentes del primero (index !== 0) si `lockTheZeroChord` es true
    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        // Asigna teclas de la fila si están disponibles, de lo contrario asigna "OCULTAR"
        if (index < assignFirstRowKeys?.length + keysByRow + 2) {
          element.key =
            assignFirstRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignFirstRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    // Bloqueo adicional de trastes fuera del rango permitido para `lockTheZeroChord`
    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    // Si `lockTheZeroChord` está en false, asigna teclas hasta que se alcance el final de la fila de teclas
    if (lockTheZeroChord === false) {
      if (index <= assignFirstRowKeys?.length + keysByRow + 1) {
        element.key = assignFirstRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    // Asignación específica de ocultación en casos no permitidos
    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // ... Realiza el mismo procedimiento de asignación para las demás cuerdas de la guitarra

  // SEGUNDA CUERDA
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
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index < assignSecondRowKeys?.length + keysByRow + 2) {
          element.key =
            assignSecondRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignSecondRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    if (lockTheZeroChord === false) {
      if (index <= assignSecondRowKeys?.length + keysByRow + 1) {
        element.key = assignSecondRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // TERCERA CUERDA
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
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index < assignThirdRowKeys?.length + keysByRow + 2) {
          element.key =
            assignThirdRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignThirdRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    if (lockTheZeroChord === false) {
      if (index <= assignThirdRowKeys?.length + keysByRow + 1) {
        element.key = assignThirdRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // CUARTA CUERDA
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
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index < assignFourthRowKeys?.length + keysByRow + 2) {
          element.key =
            assignFourthRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignFourthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    if (lockTheZeroChord === false) {
      if (index <= assignFourthRowKeys?.length + keysByRow + 1) {
        element.key = assignFourthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // QUINTA CUERDA
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
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index < assignFifthRowKeys?.length + keysByRow + 2) {
          element.key =
            assignFifthRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignFifthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    if (lockTheZeroChord === false) {
      if (index <= assignFifthRowKeys?.length + keysByRow + 1) {
        element.key = assignFifthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // SEXTA CUERDA / ULTIMA CUERDA
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
      continue;
    }

    if (index !== 0 && lockTheZeroChord === true) {
      if (index >= startFromTheChord) {
        if (index < assignSixthRowKeys?.length + keysByRow + 2) {
          element.key =
            assignSixthRowKeys[index - startFromTheChord + 1] === undefined
              ? "OCULTAR"
              : assignSixthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = undefined;
        }
      } else {
        element.key = "OCULTAR";
      }
    }

    if (index === keysByRow + startFromTheChord && lockTheZeroChord === true) {
      element.key = "OCULTAR";
    }

    if (lockTheZeroChord === false) {
      if (index <= assignSixthRowKeys?.length + keysByRow + 1) {
        element.key = assignSixthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "OCULTAR";
    }
  }

  // Filtra los trastes que no deben estar ocultos y devuelve solo los visibles
  let newFrets1 = findFirstRope.frets.filter((f) => f.key !== "OCULTAR");

  let newFrets2 = findSecondRope.frets.filter((f) => f.key !== "OCULTAR");

  let newFrets3 = findThirdRope.frets.filter((f) => f.key !== "OCULTAR");

  let newFrets4 = findFourthRope.frets.filter((f) => f.key !== "OCULTAR");

  let newFrets5 = findFifthRope.frets.filter((f) => f.key !== "OCULTAR");

  let newFrets6 = findSixthRope.frets.filter((f) => f.key !== "OCULTAR");

  // Retorna el resultado final, con cada cuerda y sus trastes visibles
  return [
    { rope: findFirstRope.rope, frets: newFrets1 },
    { rope: findSecondRope.rope, frets: newFrets2 },
    { rope: findThirdRope.rope, frets: newFrets3 },
    { rope: findFourthRope.rope, frets: newFrets4 },
    { rope: findFifthRope.rope, frets: newFrets5 },
    { rope: findSixthRope.rope, frets: newFrets6 },
  ];
};
