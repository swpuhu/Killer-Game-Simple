import killGen from './kill.js';
import {getHash, addClass} from "../../util/util.js";

const routes = {
  '#/kill': function () {
    const kill = killGen();
    routeEle.appendChild(kill.getElement());
  }
};

let route = {
  value: getHash(window.location.hash)
};
let routesKeys = Object.keys(routes);
let flag = false;
for (let r of routesKeys) {
  if (r === route.value) {
    flag = true;
  }
}
if (!flag) {
  route.value = '#/kill';
}

let routeEle = document.createElement('div');
addClass(routeEle, ['route']);
document.body.appendChild(routeEle);

window.location.hash = route.value;
routes[route.value]();


Object.defineProperty(route, 'value', {
  get () {
    return route.value;
  },
  set (newRoute) {
    window.location.hash = newRoute;
    while(routeEle.firstElementChild) {
      routeEle.firstElementChild.remove();
    }
    let flag = false;
    for (let r of routesKeys) {
      if (r === newRoute) {
        flag = true;
      }
    }
    if (!flag) {
      route.value = '#/kill';
      return;
    }
    routes[newRoute]();
  }
});
