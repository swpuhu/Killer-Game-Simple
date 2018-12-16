import headerGen from '../../component/header.js';
import base from '../../util/base.js';

export default function () {
  if (!sessionStorage.getItem('identities')) {
    window.location = '../setting/setting.html';
  }
  let players = JSON.parse(sessionStorage.getItem('identities'));
  players = players.map(item => {
    return {
      isAlive: true,
      identity: item
    }
  });
  console.log(players);
  let obj = Object.create(base);
  const header = headerGen('杀手杀人', 'header', false, true);
  const doc = document.createElement('div');
  const list = document.createElement('ul');
  for (let player in players) {

  }



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
