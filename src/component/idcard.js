import base from '../util/base.js';
import {addClass} from "../util/util.js";
import {appendChildren} from "../util/util.js";

export default function(index, name) {
  let obj = Object.create(base);
  let identity = name;
  let _index = index;
  const displayIdentity = {
    killer: '杀手',
    citizen: '平民',
    mystery: '点击按钮显示身份'
  };

  let doc = document.createElement('div');
  addClass(doc, 'idcard');

  let id = document.createElement('div');
  let idText = document.createElement('div');
  addClass(idText, 'id-content');
  idText.innerText = _index;
  appendChildren(id, idText);

  let avatar = document.createElement('div');
  addClass(avatar, ['identity-avatar', 'mystery']);
  addClass(id, 'identity-id');

  let identityText = document.createElement('div');
  addClass(identityText, ['identity-text', 'mystery']);
  identityText.innerText = displayIdentity['mystery'];

  appendChildren(doc, id, avatar, identityText);
  function getElement() {
    return doc;
  }

  function display () {
    avatar.classList.remove('mystery');
    identityText.classList.remove('mystery');
    avatar.classList.add(identity);
    identityText.classList.add(identity);
    identityText.innerText = displayIdentity[identity];
  }

  function remove() {
    doc.remove();
  }

  function setIdentity(index, name) {
    avatar.classList.remove(identity);
    identityText.classList.remove(identity);
    avatar.classList.add('mystery');
    identityText.classList.add('mystery');
    idText.innerText = index;
    identityText.innerText = displayIdentity['mystery'];
    identity = name;
  }

  Object.defineProperties(obj, {
    getElement: {
      value: getElement,
      writable: false,
      configurable:false,
      enumerable: true
    },
    remove: {
      value: remove,
      writable: false,
      configurable:false,
      enumerable: true
    },
    setIdentity: {
      value: setIdentity,
      writable: false,
      configurable:false,
      enumerable: true
    },
    display: {
      value: display,
      writable: false,
      configurable:false,
      enumerable: true
    },
  });
  return obj;
}

