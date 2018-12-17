import headerGen from '../../component/header.js';
import base from '../../util/base.js';
import avatarGen from '../../component/avatar.js';
import * as util from '../../util/util.js';
import {HISTORY} from "./state.js";
import {STAGES} from "./state.js";

export default function (players, title, btnText, stage = -1) {
  players = players.map(item => {
    return {
      isAlive: true,
      identity: item,
      killedBy: undefined
    }
  });
  let tempSelected = null;
  let playersEle = [];
  let obj = Object.create(base);
  const header = headerGen(title, 'header', false, true);
  const doc = document.createElement('div');
  const list = document.createElement('ul');
  const listEles = [];
  util.addClass(list, ['player-list']);
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let avatar = avatarGen(player, i + 1);
    list.appendChild(avatar.getElement());
    listEles.push(avatar.getElement());

    avatar.getElement().addEventListener('click', function (e) {
      tempSelected = player;
    });
  }

  const button = document.createElement('div');
  util.addClass(button, ['kill-btn']);
  button.innerText = btnText;

  button.addEventListener('click', function (e) {
    if (stage === STAGES.kill) {
      tempSelected.killedBy = 'killer';
      HISTORY[HISTORY.length - 1].killed = true;
    } else {
      tempSelected.killedBy = 'vote';
      HISTORY[HISTORY.length - 1].posteda = true;
    }
    tempSelected.isAlive = false;
    obj.dispatchEvent('buttonClick', e);
  });

  util.appendChildren(doc, header.getElement(), list, button);
  function getElement() {
    return doc;
  }
  function remove() {
    doc.remove();
    window.removeEventListener('resize', debounce);
  }
  // 节流函数防止事件短时间多次触发，提升性能
  let debounce = util.throttle(function (e) {
    console.log(e);
    listEles.forEach(item => {
      item.style.height = item.clientWidth + 'px';
    });
  }, 1000);
  window.addEventListener('resize', debounce);

  Object.defineProperties(obj, {
    getElement: {
      value: getElement,
      writable: false,
      configurable: false,
      enumerable: true
    },
    remove: {
      value: remove,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
  return obj;
}
