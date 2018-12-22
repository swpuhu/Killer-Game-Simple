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
res = res.map((item, index) => {
  return {
    id: index,
    isAlive: true,
    identity: item,
    killedBy: undefined
  }
});
const HISTORY = [
  {
    day: 1,
    step: 0,
    kill: null,
    vote: null,
    killed: false,
    posted: false,
    discussed: false,
    voted: false
  }
];
// 将结果存入SessionStorage中，供后面的页面使用
sessionStorage.setItem('identities', JSON.stringify(res));
sessionStorage.setItem('history', JSON.stringify(HISTORY));
// 渲染
const header = headerGen('Assign', 'header', true, false);
let count = 0;
let idcard = idcardGen(count + 1, res[count].identity);
let button = document.createElement('div');
addClass(button, ['identity-btn', 'next']);
button.innerText = '点击查看身份';

let clickCount = 0;
button.addEventListener('click', function () {
  if (count === res.length - 1) {
    console.log(clickCount);
    if (clickCount === 0) {
      button.innerText = '开始游戏';
      idcard.display();
      ++clickCount;
    } else {
      // TODO: 跳转页面
      console.log(1);
      window.location = '../game/index.html';
    }
    return;
  }
  if (clickCount === 0) {
    idcard.display();
    button.innerText = '下一个';
    ++clickCount;
  } else {
    ++count;
    button.innerText = '点击查看身份';
    idcard.setIdentity(count + 1, res[count].identity);
    clickCount = 0;
  }
});
let frag = document.createDocumentFragment();
appendChildren(frag, header.getElement(), idcard.getElement(), button);
document.body.appendChild(frag);
