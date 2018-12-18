import {getHash, addClass} from "../../util/util.js";
import {STAGES, players} from "./state.js";

let currentComponent = null;
const routes = {
  '#/init': function () {
    clearElement();
    // 按需加载
    import('./kill.js').then(data => {
      const listGen = data.default;
      const kill = listGen(players, '法官日记', '开始游戏');
      currentComponent = kill;
      routeEle.appendChild(kill.getElement());
      kill.addEventListener('buttonClick', function (e) {
        window.router.go('#/judge');
      });
    });
  },
  '#/judge': function () {
    clearElement();
    import('./judge.js').then(data => {
      const judgeFunc = data.default;
      const judge = judgeFunc();
      currentComponent = judge;
      routeEle.appendChild(judge.getElement());
    })
  },
  '#/killOrVote': function () {
    clearElement();
    import('./kill.js').then(data => {
      const listGen = data.default;
      let kill;
      if (STAGES.currentState === STAGES.kill) {
        kill = listGen(players, '杀手杀人', '确定', STAGES.currentState);
        STAGES.currentState = STAGES.vote;
      } else {
        kill = listGen(players, '全民投票', '确定', STAGES.currentState);
        STAGES.currentState = STAGES.kill;
      }
      currentComponent = kill;
      routeEle.appendChild(kill.getElement());
      kill.addEventListener('buttonClick', function (e) {
        window.router.go('#/judge');
      });
    });
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
  route.value = '#/init';
}

let routeEle = document.createElement('div');
addClass(routeEle, ['route']);
document.body.appendChild(routeEle);

function clearElement() {
  while(routeEle.firstElementChild) {
    routeEle.firstElementChild.remove();
  }
}


window.onhashchange = function () {
  console.log(players);
  let value = getHash(window.location.hash);
  currentComponent && currentComponent.remove();
  let flag = false;
  for (let r of routesKeys) {
    if (r === value) {
      flag = true;
    }
  }
  if (!flag) {
    window.location.hash = '#/init';
    return;
  }
  routes[value]();
};

routes[route.value]();

window.router = {};
window.router.go = function (hash) {
  window.location.hash = hash;
};

export default function () {

}

export {STAGES};
