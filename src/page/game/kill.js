import headerGen from '../../component/header.js';
import base from '../../util/base.js';

export default function () {
  let obj = Object.create(base);
  const header = headerGen('杀手杀人', 'header', false, true);
  const doc = document.createElement('div');
  doc.appendChild(header.getElement());
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
    }
  });
  return obj;
}
