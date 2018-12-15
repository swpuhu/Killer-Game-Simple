import headerGen from '../../component/header.js';
import {getParams, addClass, appendChildren} from "../../util/util.js";
import idcardGen from '../../component/idcard.js';

function shuffle(arr) {
  let _arr = [...arr];
  for (let i = _arr.length - 1; i > 0; --i) {
    let rnd = Math.floor(Math.random() * (_arr.length - 1));
    [_arr[i], _arr[rnd]] = [_arr[rnd], _arr[i]];
  }
  return _arr;
}

const header = headerGen('Assign', 'header', true, false);
let number = getParams(window.location.search).number;
let players = {
  killer: 0,
  citizen: 0
};
if (number <= 3) {
  players.killer = 1;
} else if (number > 3 && number <= 6) {
  players.killer = 2;
} else {
  players.killer = 3;
}
players.citizen = number - players.killer;
let res = [];
for (let player in players) {
  for (let i = 0; i < players[player]; i++) {
    res.push(player);
  }
}
res = shuffle(res);
console.log(res);
let idcard = idcardGen(res.shift());
let button = document.createElement('div');
addClass(button, ['identity-btn', 'next']);

let frag = document.createDocumentFragment();
appendChildren(frag, header.getElement(), idcard.getElement(), button);
document.body.appendChild(frag);
