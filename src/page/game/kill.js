import headerGen from '../../component/header.js';
import base from '../../util/base.js';
import avatarGen from '../../component/avatar.js';
import * as util from '../../util/util.js';
import {HISTORY} from "./state.js";
import {STAGES} from "./state.js";
export default function (players, title, btnText, stage = -1) {

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
    if (stage === STAGES.kill) {
      avatar.getElement().addEventListener('click', function (e) {
        if (!player.isAlive) {
          return;
        }
        tempSelected = player;
        let selectedEle = list.querySelector('.kill-selected');
        selectedEle && selectedEle.classList.remove('kill-selected');
        this.classList.add('kill-selected');
      });
    } else if (stage === STAGES.vote) {
      avatar.getElement().addEventListener('click', function (e) {
        if (!player.isAlive) {
          return;
        }
        tempSelected = player;
        let selectedEle = list.querySelector('.vote-selected');
        selectedEle && selectedEle.classList.remove('vote-selected');
        this.classList.add('vote-selected');
      });
    }
  }

  const button = document.createElement('div');
  util.addClass(button, ['kill-btn']);
  button.innerText = btnText;

  button.addEventListener('click', function (e) {
    if (!tempSelected && stage !== -1) {
      alert('plz choose a player who will be killed');
    }
    if (stage === STAGES.kill) {
      tempSelected.killedBy = 'killer';
      HISTORY[HISTORY.length - 1].killed = true;
      HISTORY[HISTORY.length - 1].kill = tempSelected;
      if (tempSelected.identity === 'killer') {
        alert('cannot kill your partner');
        return;
      }
      tempSelected && (tempSelected.isAlive = false);
      console.log(tempSelected.identity);
      sessionStorage.setItem('history', JSON.stringify(HISTORY));
      sessionStorage.setItem('identities', JSON.stringify(players));
    } else if (stage === STAGES.vote) {
      tempSelected && (tempSelected.isAlive = false);
      tempSelected.killedBy = 'vote';
      HISTORY[HISTORY.length - 1].posted = true;
      HISTORY[HISTORY.length - 1].vote = tempSelected;
      console.log(tempSelected);
      HISTORY.push(
        {
          day: HISTORY[HISTORY.length - 1].day + 1,
          step: 0,
          kill: null,
          vote: null,
          killed: false,
          posted: false,
          discussed: false,
          voted: false
        }
      );

      let aliveKillers = players.filter(item => {
        return item.isAlive && item.identity === 'killer';
      });
      let aliveCitizens = players.filter(item => {
        return item.isAlive && item.identity === 'citizen';
      });
      sessionStorage.setItem('history', JSON.stringify(HISTORY));
      sessionStorage.setItem('identities', JSON.stringify(players));
      if (aliveKillers.length >= aliveCitizens.length) {
        STAGES.wins = 'killer';
        sessionStorage.setItem('winner', 'killer');
        window.router.go('#/win');
        return;
      } else if (aliveKillers.length === 0) {
        STAGES.wins = 'citizen';
        sessionStorage.setItem('winner', 'citizen');
        window.router.go('#/win');
        return;
      }
    }

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
