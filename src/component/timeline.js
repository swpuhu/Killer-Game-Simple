import base from '../util/base.js';
import * as util from '../util/util.js';

export default function (history) {
  let obj = Object.create(base);
  obj.eventList = [];
  const doc = util.createElement('div', ['timeline']);
  const timeline = util.createElement('div', ['timeline-line']);
  const list = util.createElement('ul', ['timeline-list']);

  const kill = util.createElement('li', ['timeline-li', 'timeline-kill']);
  kill.innerHTML = '<div class="timeline-li__content">杀手杀人</div>';
  const killClick = function (e) {
    if (kill.classList.contains('done')) {
      return;
    }
    obj.dispatchEvent('killClick', e);
  };
  kill.addEventListener('click', killClick);

  const postLegacy = util.createElement('li', ['timeline-li', 'timeline-legacy']);
  postLegacy.innerHTML = '<div class="timeline-li__content">亡灵发表遗言</div>';
  const postLegacyClick = function (e) {
    if (postLegacy.classList.contains('done')) {
      return;
    }
    obj.dispatchEvent('postLegacyClick', e);
  };
  postLegacy.addEventListener('click', postLegacyClick);

  const discuss = util.createElement('li', ['timeline-li', 'timeline-discuss']);
  discuss.innerHTML = '<div class="timeline-li__content">玩家依次发言讨论</div>';
  const discussClick = function (e) {
    if (discuss.classList.contains('done')) {
      return;
    }
    obj.dispatchEvent('discussClick', e);
  };
  discuss.addEventListener('click', discussClick);

  const vote = util.createElement('li', ['timeline-li','timeline-vote']);
  vote.innerHTML = '<div class="timeline-li__content">全民投票</div>';
  const voteClick = function (e) {
    if (vote.classList.contains('done')) {
      return;
    }
    obj.dispatchEvent('voteClick', e);
  };
  vote.addEventListener('click', voteClick);

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

  util.appendChildren(list, kill, postLegacy, discuss, vote);
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
