import base from '../util/base.js';
import * as util from '../util/util.js';

export default function (history) {
  const obj = Object.create(base);
  const doc = util.createElement('div', ['timeline']);
  const timeline = util.createElement('div', ['timeline-line']);
  const list = util.createElement('ul', ['timeline-list']);

  const kill = util.createElement('li', ['timeline-li', 'timeline-kill']);
  kill.innerHTML = '<div class="timeline-li__content">杀手杀人</div>';

  const postLegacy = util.createElement('li', ['timeline-li', 'timeline-legacy']);
  postLegacy.innerHTML = '<div class="timeline-li__content">亡灵发表遗言</div>';

  const discuss = util.createElement('li', ['timeline-li', 'timeline-discuss']);
  discuss.innerHTML = '<div class="timeline-li__content">玩家依次发言讨论</div>';

  const vote = util.createElement('li', ['timeline-li','timeline-vote']);
  vote.innerHTML = '<div class="timeline-li__content">全民投票</div>';

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
    doc.remove();
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
