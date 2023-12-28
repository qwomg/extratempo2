import React from 'react';
import styles from '../styles/StartStopButton.module.css';

const StartStopButton = ({ isPlaying, handleStartStop }) => {
  return (
    <button
      id="start-stop-button"
      className={styles.startStopButton}
      onClick={handleStartStop}
    >
      {isPlaying ? 'Stop' : 'Start'}
    </button>
  );
};

export default StartStopButton;