const METRONOME_STATE_KEY = 'metronomeState';

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(METRONOME_STATE_KEY, serializedState);
  } catch (err) {
    // Handle errors here, possibly ignore or log
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(METRONOME_STATE_KEY);
    if (serializedState === null) {
      return undefined; // No state saved in local storage
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // Errors could occur if the stored state is invalid
  }
};