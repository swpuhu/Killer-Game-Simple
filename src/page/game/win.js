import * as util from '../../util/util.js';
import base from '../../util/base.js';
import headerFunc from '../../component/header.js';
import {HISTORY, displayIdentity} from "./state.js";

function historyItem (history) {
  if (!history.kill && !history.vote) {
    return;
  }
  let doc = document.createElement('li');
  util.addClass(doc, ['win-list__item']);
  let dayEle = document.createElement('div');
  util.addClass(dayEle, ['item-day']);
  dayEle.innerText = `第${history.day}天`;

  let nightTime;
  if (history.kill) {
    nightTime = document.createElement('div');
    util.addClass(nightTime, ['item-night']);
    nightTime.innerText = `晚上： ${history.kill.id}号被杀死， 真实身份是${displayIdentity[history.kill.identity]}`;
  }
  let dayTime;
  if (history.vote) {
    dayTime = document.createElement('div');
    util.addClass(dayTime, ['item-daytime']);
    dayTime.innerText = `白天： ${history.vote.id}号被投死， 真实身份是${displayIdentity[history.vote.identity]}`;
  }
  util.appendChildren(doc, dayEle, nightTime, dayTime);
  return doc;
}

export default function (winner) {
  let obj = Object.create(base);
  let doc = document.createElement('div');
  util.addClass(doc, ['winner']);
  let header = headerFunc('游戏结束', ['header'], true, true);
  let winnerLabel = document.createElement('div');
  winnerLabel.innerText = `${displayIdentity[winner]}获胜`;
  util.addClass(winnerLabel, ['winner-label']);

  let winBanner = document.createElement('div');
  util.addClass(winBanner, ['win-banner']);

  let list = document.createElement('ul');

  for (let history of HISTORY) {
    let item = historyItem(history);
    util.appendChildren(list, item);
  }
  util.appendChildren(doc, header.getElement(), winnerLabel, winBanner, list);

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
