import listGen from './kill.js';
import {getHash, addClass} from "../../util/util.js";
import router from './router.js';

if (!sessionStorage.getItem('identities')) {
  window.location = '../setting/setting.html';
}
