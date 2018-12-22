let players = JSON.parse(sessionStorage.getItem('identities'));
let HISTORY = JSON.parse(sessionStorage.getItem('history'));

export const STAGES = {
  kill: 0,
  vote: 1,
  currentState: 0,
  wins: null
};
export {players, HISTORY};

const displayIdentity = {
  killer: '杀手',
  citizen: '平民',
  mystery: '点击按钮显示身份'
};

export {displayIdentity}
