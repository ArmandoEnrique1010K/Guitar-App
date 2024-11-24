import { useEffect } from "react";
import { muteCurrentNote, playSound } from "../services/audioPlayer";

export const useChord = (
  rope,
  chord,
  handleNotePlayed,
  data,
  mutePreviousChord,
  // volume,
  name,
  keyfromkeyboard,
  pulseMode,
  effects,
  typeMode
) => {
  const note = { rope, chord };

  const handlePlaySound = (clickMode) => {
    handleNotePlayed(note);
    playSound(
      name,
      data,
      rope,
      chord,
      mutePreviousChord,
      // volume,
      keyfromkeyboard,
      clickMode,
      effects
    );
  };

  const handleStopSound = () => {
    muteCurrentNote();
    // setIsPlayed(false); // Marca la nota como detenida
  };

  useEffect(() => {
    const handleKeyDownPlaySound = (event) => {
      // ESTO ES MEJOR EN LUGAR DE UTILIZAR UN && en event.key
      if (typeMode === true) return;
      if (event.key === keyfromkeyboard) {
        handlePlaySound(false);
      }
    };

    const handleKeyUpStopSound = (event) => {
      // Si se suelta la tecla asignada y pulseMode es falso, se silencia la nota actual
      if (event.key === keyfromkeyboard && pulseMode === true) {
        //setIsPlayed(false)
        handleStopSound();
      }
    };

    window.addEventListener("keydown", handleKeyDownPlaySound);
    window.addEventListener("keyup", handleKeyUpStopSound);

    return () => {
      window.removeEventListener("keydown", handleKeyDownPlaySound);
      window.removeEventListener("keyup", handleKeyUpStopSound);
    };
  }, [keyfromkeyboard, pulseMode, handleNotePlayed]);

  return { handlePlaySound, handleStopSound };
};
