import React from 'react';
import styles from '../styles/Beat.module.css';
import { BEAT_OPTIONS, SOUNDS, DEFAULT_SOUND } from '../utils/localStorage';

const Beat = ({ beat, index, updateBeat, isPlaying }) => {
  const handleBeatClick = () => {
    if (isPlaying) return; // Prevent changes while playing
    const nextStatus = (beat.status + 1) % Object.keys(BEAT_OPTIONS).length;
    updateBeat(index, { ...beat, status: nextStatus });
  };

  const handleLongPress = () => {
    if (isPlaying) return; // Prevent changes while playing
    // MVP: Only default sound, so no action required for now
  };

  const getBeatStyle = () => {
    switch (beat.status) {
      case BEAT_OPTIONS.accented:
        return styles.accented;
      case BEAT_OPTIONS.notAccented:
        return styles.notAccented;
      case BEAT_OPTIONS.muted:
        return styles.muted;
      default:
        return '';
    }
  };

  const getSound = () => {
    return SOUNDS[beat.status] || DEFAULT_SOUND;
  };

  return (
    <div
      className={`${styles.beat} ${getBeatStyle()} ${isPlaying ? styles.playing : ''}`}
      onClick={handleBeatClick}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLongPress();
      }}
      id={`beat-${index}`}
      data-sound={getSound()}
    />
  );
};

export default Beat;