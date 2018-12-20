import headerFunc from '../../component/header.js';
import * as util from '../../util/util.js';
import base from '../../util/base.js';
import timelineFunc from '../../component/timeline.js';
import {HISTORY, STAGES} from "./state.js";


const CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const unit1 = ['十', '百', '千', '万'];

function numberToCN(n) {
  if (typeof n === 'number') {
    n = n.toString();
  }
  if (typeof n !== 'string') {
    throw new Error('type error');
  }
  if (n.length > 5) {
    throw new Error('beyond max length');
  }

  let number = n.split('');
  let res = [];
  for (let i = number.length - 1; i >= 0; --i) {
    let item = number[i];
    let prevItem = number[i - 1];
    res.unshift(CN[item]);
    if (prevItem) {
      res.unshift(unit1[number.length - i -1]);
    }
  }
  if (res.length === 3 && res[0] === '一') {
    res.shift();
  }
  return res.join('');
}

export default function () {
  let obj = Object.create(base);
  const header = headerFunc('法官台本', 'header', true, true);
  const doc = document.createElement('div');
  const body = document.createElement('div');
  util.addClass(body, ['judge-body']);
  const footer = document.createElement('div');
  util.addClass(footer, ['judge=footer']);

  util.appendChildren(doc, header.getElement(), body, footer);
  let timeline = null;
  const days = [];
  for (let i = 0; i < HISTORY.length; i++) {
    let item = HISTORY[i];
    let dayRow = util.createElement('div', ['judge-row']);
    let content = util.createElement('div', ['row-content']);
    content.innerText = `第${numberToCN(item.day)}天`;
    dayRow.isShowTimeline = false;
    dayRow.index = i;
    days.push(dayRow);

    dayRow.addEventListener('click', function (e) {
      days.forEach(item => {
        if (item.isShowTimeline === true) {
          item.isShowTimeline = false;
          timeline.remove();
        }
      });
      dayRow.isShowTimeline = true;
      timeline = timelineFunc(item, i);
      addEvent.call(timeline);
      util.appendChildren(dayRow, timeline.getElement());
    });

    if (i === HISTORY.length - 1) {
      timeline = timelineFunc(item, i);
      dayRow.isShowTimeline = true;
    }
    util.appendChildren(dayRow, content);
    if (timeline) {
      addEvent.call(timeline);
      util.appendChildren(dayRow, timeline.getElement());
    }
    body.appendChild(dayRow);
  }

  function addEvent() {
    this.addEventListener('killClick', function (e, index) {
      HISTORY[index].killed = true;
      STAGES.currentState = STAGES.kill;
      sessionStorage.setItem('history', JSON.stringify(HISTORY));
      window.router.go('#/killOrVote');
    });
    this.addEventListener('postLegacyClick', function (e, index) {
      HISTORY[index].posted = true;
      sessionStorage.setItem('history', JSON.stringify(HISTORY));
    });
    this.addEventListener('discussClick', function (e, index) {
      HISTORY[index].discussed = true;
      sessionStorage.setItem('history', JSON.stringify(HISTORY));
      console.log('discussClick');
    });
    this.addEventListener('voteClick', function (e, index) {
      HISTORY[index].voted = true;
      STAGES.currentState = STAGES.vote;
      console.log('voteClick');
      window.router.go('#/killOrVote');
    });
  }

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

export {HISTORY};
