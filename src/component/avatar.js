import base from '../util/base.js';
import * as util from '../util/util.js';

export default function (identity, index) {
  const displayIdentity = {
    killer: '杀手',
    citizen: '平民',
    mystery: '点击按钮显示身份'
  };
  let obj = Object.create(base);
  let doc = document.createElement('li');
  util.addClass(doc, ['list-avatar', identity.identity]);
  if (!identity.isAlive) {
    doc.classList.add('death');
  }
  doc.identity = identity;

  let wrapper = document.createElement('div');
  util.addClass(wrapper, ['list-wrapper']);

  let name = document.createElement('div');
  util.addClass(name, ['list-name']);
  name.innerText = displayIdentity[identity.identity];

  let indexEle = document.createElement('div');
  util.addClass(indexEle, 'list-index');
  indexEle.innerHTML = `<div style="flex: 1">${index}号</div>`;

  util.appendChildren(wrapper, name, indexEle);

  let prompt = document.createElement('div');
  util.addClass(prompt, 'list-prompt');

  util.appendChildren(doc, wrapper, prompt);

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
