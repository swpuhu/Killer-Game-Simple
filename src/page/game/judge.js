import headerFunc from '../../component/header.js';
import * as util from '../../util/util.js';
import base from '../../util/base.js';
import timelineFunc from '../../component/timeline.js';
import {HISTORY, STAGES} from "./state.js";


export default function () {
  let obj = Object.create(base);
  const header = headerFunc('法官台本', 'header', true, true);
  const doc = document.createElement('div');
  const body = document.createElement('div');
  util.addClass(body, ['judge-body']);
  const footer = document.createElement('div');
  util.addClass(footer, ['judge=footer']);

  let Observer = new MutationObserver(function (mutationList) {
    for (let mutation of mutationList) {
      if (mutation.addedNodes[0]) {
        if (mutation.addedNodes[0].childNodes[1] === timeline.getElement() || mutation.addedNodes[0] === timeline.getElement()) {
          timeline.resetHeight();
        }
      }
    }
  });
  let config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };
  Observer.observe(doc, config);

  util.appendChildren(doc, header.getElement(), body, footer);
  let timeline = null;
  const days = [];
  for (let i = 0; i < HISTORY.length; i++) {
    let item = HISTORY[i];
    let dayRow = util.createElement('div', ['judge-row']);
    let content = util.createElement('div', ['row-content']);
    content.innerText = `第${util.numberToCN(item.day)}天`;
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
    Observer.disconnect();
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
