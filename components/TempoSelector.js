import React from 'react';
import { MIN_TEMPO, MAX_TEMPO } from '../utils/constants';
import styles from '../styles/TempoSelector.module.css';

const TempoSelector = ({ tempo, setTempo }) => {
  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  return (
    <div className={styles.tempoSelector}>
      <label htmlFor="tempo-selector">Tempo (BPM):</label>
      <input
        id="tempo-selector"
        type="range"
        min={MIN_TEMPO}
        max={MAX_TEMPO}
        value={tempo}
        onChange={handleTempoChange}
      />
      <div className={styles.tempoValue}>{tempo} BPM</div>
    </div>
  );
};

export default TempoSelector;