import base from '../util/base.js';
import {addClass} from "../util/util.js";
import {appendChildren} from "../util/util.js";

export default function(index, name) {
  let obj = Object.create(base);
  let identity = name;
  let _index = index;
  let doc = document.createElement('div');
  addClass(doc, 'idcard');
  let id = document.createElement('div');
  id.innerText = _index;
  let avatar = document.createElement('div');
  addClass(avatar, ['identity-avatar', identity]);
  addClass(id, 'identity-id');

  appendChildren(doc, id, avatar);
  function getElement() {
    return doc;
  }

  function remove() {
    doc.remove();
  }

  function setIdentity(index, name) {
    avatar.classList.remove(identity);
    avatar.classList.add(name);
    id.innerText = index;
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
    }
  });
  return obj;
}

