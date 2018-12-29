import * as util from '../util/util.js';
import base from '../util/base.js';

const modal = function (message, confirmText = '确定', cancelText = '取消') {
  let obj = Object.create(base);
  let doc = document.createElement('div');
  util.addClass(doc, ['modal-wrapper']);
  let messageBox = document.createElement('div');
  util.addClass(messageBox, ['message']);
  messageBox.innerText = message;
  let footer = document.createElement('div');
  util.addClass(footer, ['btn-groups']);
  let confirmButton = document.createElement('button');
  util.addClass(confirmButton, ['confirm-btn']);
  confirmButton.innerText = confirmText;
  let cancelButton = document.createElement('button');
  cancelButton.innerText = cancelText;
  util.addClass(cancelButton, ['cancel-btn']);

  function confirmHandler (e) {
    e.stopPropagation();
    remove();
  }
  confirmButton.addEventListener('click', confirmHandler);
  cancelButton.addEventListener('click', confirmHandler);

  util.appendChildren(footer, confirmButton, cancelButton);
  util.appendChildren(doc, messageBox, footer);
  function getElement() {
    return doc;
  }

  doc.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    let x = e.targetTouches[0].clientX;
    let y = e.targetTouches[0].clientY;
    let offsetLeft = doc.offsetLeft;
    let offsetTop = doc.offsetTop;
    let move = function (ev) {
      ev.preventDefault();
      doc.style.left = offsetLeft + (ev.targetTouches[0].clientX - x) + 'px';
      doc.style.top = offsetTop  + (ev.targetTouches[0].clientY - y) + 'px';
    };
    let end = function(e) {
      document.removeEventListener('touchend', move);
      document.removeEventListener('touchend', end);
    };
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', end);

  });
  function remove() {
    doc.remove();
  }

  function show() {
    document.body.appendChild(doc);
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
    show: {
      value: show,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
  return obj;
};

export default util.getSingle(modal);
