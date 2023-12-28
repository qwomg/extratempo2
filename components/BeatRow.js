import React from 'react';
import Beat from './Beat';
import styles from '../styles/BeatRow.module.css';

const BeatRow = ({ beats, onBeatClick, onBeatLongPress }) => {
  return (
    <div className={styles.beatRow}>
      {beats.map((beat, index) => (
        <Beat
          key={index}
          beat={beat}
          onClick={() => onBeatClick(index)}
          onLongPress={() => onBeatLongPress(index)}
        />
      ))}
    </div>
  );
};

export default BeatRow;