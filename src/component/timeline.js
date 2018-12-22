import base from '../util/base.js';
import * as util from '../util/util.js';
import {displayIdentity} from "../page/game/state.js";

export default function (history, _index) {
  let index = _index;
  let obj = Object.create(base);
  obj.eventList = [];
  const doc = util.createElement('div', ['timeline']);
  const timeline = util.createElement('div', ['timeline-line']);
  const list = util.createElement('ul', ['timeline-list']);

  const kill = util.createElement('li', ['timeline-li', 'timeline-kill']);
  kill.innerHTML = '<div class="timeline-li__content">杀手杀人</div>';
  const killClick = function (e) {
    if (history.step !== 0) {
      return;
    }
    if (kill.classList.contains('done')) {
      return;
    }
    ++history.step;
    sessionStorage.setItem('history', JSON.stringify(history));
    obj.dispatchEvent('killClick', e, index);
  };
  kill.addEventListener('click', killClick);

  let killerPrompt;
  if (history.kill) {
    killerPrompt = document.createElement('div');
    util.addClass(killerPrompt, ['killer-prompt', 'timeline-prompt']);
    killerPrompt.innerText = `${history.kill.id}被杀手杀死，其真实身份是${displayIdentity[history.kill.identity]}`;
  }


  const postLegacy = util.createElement('li', ['timeline-li', 'timeline-legacy']);
  postLegacy.innerHTML = '<div class="timeline-li__content">亡灵发表遗言</div>';
  const postLegacyClick = function (e) {
    if (history.step !== 1) {
      return;
    }
    if (postLegacy.classList.contains('done')) {
      return;
    }
    ++history.step;
    sessionStorage.setItem('history', JSON.stringify(history));
    obj.dispatchEvent('postLegacyClick', e, index);
  };
  postLegacy.addEventListener('click', postLegacyClick);

  const discuss = util.createElement('li', ['timeline-li', 'timeline-discuss']);
  discuss.innerHTML = '<div class="timeline-li__content">玩家依次发言讨论</div>';
  const discussClick = function (e) {
    if (history.step !== 2) {
      return;
    }
    if (discuss.classList.contains('done')) {
      return;
    }
    ++history.step;
    sessionStorage.setItem('history', JSON.stringify(history));
    obj.dispatchEvent('discussClick', e, index);
  };
  discuss.addEventListener('click', discussClick);

  const vote = util.createElement('li', ['timeline-li', 'timeline-vote']);
  vote.innerHTML = '<div class="timeline-li__content">全民投票</div>';
  const voteClick = function (e) {
    if (history.step !== 3) {
      return;
    }
    if (vote.classList.contains('done')) {
      return;
    }
    obj.dispatchEvent('voteClick', e, index);
  };
  vote.addEventListener('click', voteClick);

  let votePrompt;
  if (history.vote) {
    votePrompt = document.createElement('div');
    util.addClass(votePrompt, ['vote-prompt', 'timeline-prompt']);
    votePrompt.innerText = `${history.vote.id}号被投票投死，其真实身份是${displayIdentity[history.vote.identity]}`
  }
  if (history.killed) {
    kill.classList.add('done');
  }
  if (history.posted) {
    postLegacy.classList.add('done');
  }
  if (history.discussed) {
    discuss.classList.add('done');
  }
  if (history.voted) {
    vote.classList.add('done');
  }

  util.appendChildren(list, kill, killerPrompt ,postLegacy, discuss, vote, votePrompt);
  util.appendChildren(doc, timeline, list);

  function getElement() {
    return doc;
  }

  function remove() {
    kill.removeEventListener('click', killClick);
    postLegacy.removeEventListener('click', postLegacyClick);
    discuss.removeEventListener('click', discussClick);
    vote.removeEventListener('click', voteClick);
    doc.remove();
    obj = null;
  }

  function resetLineHeight () {
    timeline.style.height = doc.clientHeight + 'px';
  }

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
    },
    resetHeight: {
      value: resetLineHeight,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
  return obj;
}
