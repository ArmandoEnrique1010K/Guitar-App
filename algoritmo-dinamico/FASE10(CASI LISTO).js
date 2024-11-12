import { cleanSoloNotes } from "./cleanSoloNotes";
import { keyboardKeys } from "./keyboardKeys";

const keysByRow = 11 - 1;

export const getDynamicKeysAndChords = (
  file,
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
  lockTheZeroChord,
  invertKeyboard
) => {
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

  let findFirstRope = file.find((n) => n.rope === firstRope);
  let findSecondRope = file.find((n) => n.rope === secondRope);
  let findThirdRope = file.find((n) => n.rope === thirdRope);
  let findFourthRope = file.find((n) => n.rope === fourthRope);
  let findFifthRope = file.find((n) => n.rope === fifthRope);
  let findSixthRope = file.find((n) => n.rope === sixthRope);

  // PRIMERA
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
        if (index < assignFirstRowKeys?.length + keysByRow + 2) {
          element.key =
            assignFirstRowKeys[index - startFromTheChord + 1] === undefined
              ? "ESTO SE DEBE OCULTAR"
              : assignFirstRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignFirstRowKeys?.length + keysByRow + 1) {
        element.key = assignFirstRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  // SEGUNDA
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
              ? "ESTO SE DEBE OCULTAR"
              : assignSecondRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignSecondRowKeys?.length + keysByRow + 1) {
        element.key = assignSecondRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  // TERCERA
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
              ? "ESTO SE DEBE OCULTAR"
              : assignThirdRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignThirdRowKeys?.length + keysByRow + 1) {
        element.key = assignThirdRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  // CUARTA
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
              ? "ESTO SE DEBE OCULTAR"
              : assignFourthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignFourthRowKeys?.length + keysByRow + 1) {
        element.key = assignFourthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  // QUINTA
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
              ? "ESTO SE DEBE OCULTAR"
              : assignFifthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignFifthRowKeys?.length + keysByRow + 1) {
        element.key = assignFifthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  // SEXTA / ULTIMA
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
              ? "ESTO SE DEBE OCULTAR"
              : assignSixthRowKeys[index - startFromTheChord + 1];
        } else {
          element.key = "UNDEFINED";
        }
      } else {
        element.key = "ESTO SE DEBE OCULTAR";
      }
    }

    if (lockTheZeroChord === false) {
      if (index <= assignSixthRowKeys?.length + keysByRow + 1) {
        element.key = assignSixthRowKeys[index - startFromTheChord];
      } else {
        element.key = undefined;
      }
    }

    if (lockTheZeroChord === false && index <= startFromTheChord - 1) {
      element.key = "ESTO SE DEBE OCULTAR";
    }

    if (index > keysByRow + startFromTheChord) {
      element.key = "ESTO SE DEBE OCULTAR";
    }
  }

  let newFrets1 = findFirstRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFrets2 = findSecondRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFrets3 = findThirdRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFrets4 = findFourthRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFrets5 = findFifthRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  let newFrets6 = findSixthRope.frets.filter(
    (f) => f.key !== "ESTO SE DEBE OCULTAR"
  );

  return [
    { rope: findFirstRope.rope, frets: [newFrets1] },
    { rope: findSecondRope.rope, frets: [newFrets2] },
    { rope: findThirdRope.rope, frets: [newFrets3] },
    { rope: findFourthRope.rope, frets: [newFrets4] },
    { rope: findFifthRope.rope, frets: [newFrets5] },
    { rope: findSixthRope.rope, frets: [newFrets6] },
  ];
};

console.log(
  getDynamicKeysAndChords(
    cleanSoloNotes,
    // Filas de teclado para cada cuerda (FUNCIONA BIEN)
    1,
    2,
    3,
    4,
    5,
    6,
    // Cuerdas a asignar (4 y 5 son undefined)
    0,
    1,
    2,
    3,
    4,
    5,

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
    // Bloqueo del traste cero
    false,
    // Invertir teclado
    false
  )
);
