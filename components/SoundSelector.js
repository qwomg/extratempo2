import React from 'react';
import styles from '../styles/SoundSelector.module.css';

const SoundSelector = ({ selectedSound, onSelectSound }) => {
  // MVP version only has one default sound, so the selector is not needed for now.
  // This component is prepared for future versions where multiple sounds can be selected.
  return (
    <div className={styles.soundSelector}>
      <label htmlFor="sound-selector">Select Sound:</label>
      <select
        id="sound-selector"
        value={selectedSound}
        onChange={(e) => onSelectSound(e.target.value)}
        disabled // Disabled for MVP as there's only one default sound
      >
        <option value="default">Default Beep</option>
        {/* Future sound options will be added here */}
      </select>
    </div>
  );
};

export default SoundSelector;