import { useState, useEffect, useCallback } from 'react';
import { BEAT_OPTIONS, SOUNDS, DEFAULT_SOUND, MAX_BEATS, MIN_TEMPO, MAX_TEMPO } from '../utils/constants';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../utils/localStorage';
import useAudio from '../utils/useAudio';

const useMetronome = () => {
  const [beats, setBeats] = useState([]);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const { play } = useAudio();

  useEffect(() => {
    const savedState = loadStateFromLocalStorage();
    if (savedState) {
      setBeats(savedState.beats);
      setTempo(savedState.tempo);
    } else {
      // Initialize beats with default options
      setBeats(new Array(MAX_BEATS).fill({ status: BEAT_OPTIONS.NOT_ACCENTED, sound: DEFAULT_SOUND }));
    }
  }, []);

  useEffect(() => {
    saveStateToLocalStorage({ beats, tempo });
  }, [beats, tempo]);

  const handleBeatClick = useCallback((index) => {
    setBeats((prevBeats) => {
      const newBeats = [...prevBeats];
      const currentStatus = newBeats[index].status;
      const nextStatus = (currentStatus + 1) % Object.keys(BEAT_OPTIONS).length;
      newBeats[index] = {
        ...newBeats[index],
        status: nextStatus,
        sound: SOUNDS[nextStatus] || DEFAULT_SOUND,
      };
      return newBeats;
    });
  }, []);

  const handleStartStop = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  const handleTempoChange = useCallback((newTempo) => {
    setTempo(newTempo);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentBeatIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % beats.length;
          play(beats[nextIndex].sound);
          return nextIndex;
        });
      }, (60 / tempo) * 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, tempo, beats, play]);

  return {
    beats,
    setBeats,
    tempo,
    setTempo,
    isPlaying,
    setIsPlaying,
    currentBeatIndex,
    setCurrentBeatIndex,
    handleBeatClick,
    handleStartStop,
    handleTempoChange,
  };
};

export default useMetronome;