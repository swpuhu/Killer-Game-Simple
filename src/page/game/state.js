let players = JSON.parse(sessionStorage.getItem('identities'));
let HISTORY = JSON.parse(sessionStorage.getItem('history'));

export const STAGES = {
  kill: 0,
  vote: 1,
  currentState: 0,
  wins: null
};
export {players, HISTORY};
