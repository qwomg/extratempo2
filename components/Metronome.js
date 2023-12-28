import React, { useState, useEffect } from 'react';
import BeatRow from './BeatRow';
import StartStopButton from './StartStopButton';
import TempoSelector from './TempoSelector';
import SoundSelector from './SoundSelector';
import { useMetronome } from '../hooks/useMetronome';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils/localStorage';
import styles from '../styles/Metronome.module.css';

const Metronome = () => {
  const [metronomeState, setMetronomeState] = useState({
    beats: [],
    tempo: 120,
    isPlaying: false,
  });

  const { beats, tempo, isPlaying } = metronomeState;
  const { handleBeatClick, handleLongPress, handleStartStop, handleTempoChange, playBeat } = useMetronome(metronomeState, setMetronomeState);

  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      setMetronomeState(savedState);
    }
  }, []);

  useEffect(() => {
    saveStateToLocalStorage(metronomeState);
  }, [metronomeState]);

  const renderBeatRows = () => {
    const rows = [];
    for (let i = 0; i < beats.length; i += 10) {
      rows.push(
        <BeatRow
          key={`row-${i}`}
          beats={beats.slice(i, i + 10)}
          startIndex={i}
          onBeatClick={handleBeatClick}
          onLongPress={handleLongPress}
          isPlaying={isPlaying}
          playBeat={playBeat}
        />
      );
    }
    return rows;
  };

  return (
    <div className={styles.metronomeContainer} id="metronome-container">
      <div className={styles.beatRowsContainer}>
        {renderBeatRows()}
      </div>
      <div className={styles.controlsContainer}>
        <StartStopButton isPlaying={isPlaying} onClick={handleStartStop} />
        <TempoSelector tempo={tempo} onTempoChange={handleTempoChange} />
        <SoundSelector onSoundSelection={() => {}} />
      </div>
    </div>
  );
};

export default Metronome;