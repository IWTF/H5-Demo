/* ==================slide 初始化=============== */
const isIphonex = () => /iphone/gi.test(navigator.userAgent) && window.screen && (window.screen.height === 812 && window.screen.width === 375);

scaleW = window.innerWidth / 375;
scaleH = window.innerHeight / 667;

var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
  resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
  resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
  resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
  resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
}



/* ================解决键盘压缩页面的问题 =============*/
var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
window.onload = function () { //在页面整体加载完毕时
  document.getElementById('app').style.height = hrt + 'px'//把获取到的高度赋值给根div
}

let num = document.getElementById('num')
let newNum = Math.round(Math.random() * 1000 + Math.random() * 100 + Math.random() * 10) + (num.innerHTML - '0')
num.innerHTML = newNum

var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: '.swiper-pagination',
  //virtualTranslate : true,
  mousewheelControl: true,
  onInit: function (swiper) {
    swiperAnimateCache(swiper);
    swiperAnimate(swiper);
  },
  onSlideChangeEnd: function (swiper) {
    swiperAnimate(swiper);
  },
  onTransitionEnd: function (swiper) {
    swiperAnimate(swiper);
  },


  watchSlidesProgress: true,

  onProgress: function (swiper) {
    for (var i = 0; i < swiper.slides.length; i++) {
      var slide = swiper.slides[i];
      var progress = slide.progress;

      var translate = progress * swiper.height / 4;
      scale = 1 - Math.min(Math.abs(progress * 0.5), 1);

      var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
      slide.style.opacity = opacity;
      es = slide.style;
      es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

    }
  },

  onSetTransition: function (swiper, speed) {
    for (var i = 0; i < swiper.slides.length; i++) {
      es = swiper.slides[i].style;
      es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

    }
  },
})

/* ================表单检验的函数================== */
const btn = document.getElementById('btn')
const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const address = document.getElementById('address');

form.addEventListener('submit', e => {
  e.preventDefault();

  checkInputs();
});

function checkInputs () {
  // trim to remove the whitespaces
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const usernameValue = username.value.trim();

  if (usernameValue === '') {
    setErrorFor(username, '姓名不能为空');
    return;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === '') {
    setErrorFor(email, '联系方式不能为空');
    return;
  } else {
    setSuccessFor(email);
  }

  if (addressValue === '') {
    setErrorFor(address, '接力地址不能为空');
    return;
  } else {
    setSuccessFor(address);
  }

  setSuccess();
}

function setErrorFor (input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor (input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function setSuccess () {
  btn.innerHTML = '接力成功！';
  btn.disabled = "disabled";
  setTimeout(() => {
    btn.innerHTML = '接力';
    btn.disabled = "";
    mySwiper.slideNext();
  }, 500);
}


/* ================自定义点击事件============== */
var man = document.getElementById('man');
var woman = document.getElementById('woman');
var winner = document.getElementById('winner');
man.onclick = () => {
  winner.src = './images/man.gif';
  mySwiper.slideNext();
}
woman.onclick = () => {
  winner.src = './images/woman.gif';
  mySwiper.slideNext();
}

// 跑步页面最后的跳转
var zhengshu = document.getElementById('zhengshu')
zhengshu.onclick = () => {
  event.preventDefault();
  mySwiper.slideNext();
}

/* ================ 证书绘制 ================*/
// 拼出来的图片的宽度
const width = 360;
var height = 602;

// 拼出来的图片的质量，0-1之间，越大质量越好
const encoderOptions = 1

// 头像图片的实例化对象
var avatarWidth = 60;
var avatarHeight = 77;
var avatarImg = undefined;
const avatarInput = document.getElementById('avatar-input');
const avatarDiv = document.getElementById('avatar-container');

// 运动轨迹图片实例化对象
var runWidth = 90;
var runHeight = 130;
var runImg = undefined;
const runInput = document.getElementById('run-input');
const runDiv = document.getElementById('run-container');

avatarInput.addEventListener('change', event => {
  const files = Array.from(event.target.files);
  fileToInstance(files[0], 'avatar');
})

runInput.addEventListener('change', event => {
  const files = Array.from(event.target.files);
  fileToInstance(files[0], 'run');
})

const fileToInstance = (file, t) => {
  const reader = new FileReader()
  // 把文件读为 dataUrl
  reader.readAsDataURL(file)
  reader.onload = e => {
    const image = new Image()
    image.src = e.target.result
    image.onload = () => {
      // 图片实例化成功后存起来
      if (t == 'avatar') {
        avatarImg = image;
        drawAvatar(finalImageUrl => {
          let avatar = document.getElementById('avatar');
          let avatar1 = document.getElementById('avatar1');
          avatar.src = finalImageUrl;
          avatar1.src = finalImageUrl;
        })
      } else {
        runImg = image;
        drawRun(finalImageUrl => {
          let map = document.getElementById('map');
          let map1 = document.getElementById('map1');
          map.src = finalImageUrl;
          map1.src = finalImageUrl;
        })
      }

    }
  }
}

const drawAvatar = (callback) => {
  avatarWidth = avatarHeight / avatarImg.height * avatarImg.width;
  var canvas = document.createElement('canvas');
  canvas.width = avatarWidth;
  canvas.height = avatarHeight;

  const context = canvas.getContext('2d');
  context.drawImage(avatarImg, 0, 0, avatarWidth, avatarHeight);

  callback(canvas.toDataURL('image/png', encoderOptions));
}

const drawRun = (callback) => {
  runWidth = runHeight / runImg.height * runImg.width;
  var canvas = document.createElement('canvas');
  canvas.width = runWidth;
  canvas.height = runHeight;

  const context = canvas.getContext('2d');
  context.drawImage(runImg, 0, 0, runWidth, runHeight);

  callback(canvas.toDataURL('image/png', encoderOptions));
}
let certificate = document.getElementById('certificate');
let avatar1 = document.getElementById('avatar1');
let map1 = document.getElementById('map1');
let name1 = document.getElementById('name1');
let rank1 = document.getElementById('rank1');
let jiyu1 = document.getElementById('jiyu1');
let chuang1 = document.getElementById('chuang1');

/** ?????? 这部分代码不生效 */
let cerHeight = parseInt(certificate.style.width) * 1.66;
console.log("===========", cerHeight);
avatar1.style.top = 30 * (cerHeight / 619) + 'px';
map1.style.top = 428 * (cerHeight / 619) + 'px';
console.log("===========", avatar1.style.top);
console.log("===========", map1.style.top);
name1.style.top = 218 * (cerHeight / 619) + 'px';
rank1.style.top = 236 * (cerHeight / 619) + 'px';
chuang1.style.top = 439 * (cerHeight / 619) + 'px';
jiyu1.style.top = 296 * (cerHeight / 619) + 'px';

createHoster.onclick = () => {
  // 信息的来源
  let comment0 = document.getElementById('comment0');
  let comment = document.getElementById('comment');
  let cc0 = comment0.value.trim();
  let cc = comment.value.trim();
  if (avatarImg == undefined ||
    runImg == undefined ||
    cc0 == '' ||
    cc == '') {
    showToast('jinggao', '请把表单填写完整', 'slide5');
    return;
  }
  mySwiper.slideNext();

  // slide6中要补充的信息
  name1.innerHTML = username.value.trim();
  rank1.innerHTML = newNum;
  chuang1.innerHTML = cc0;
  jiyu1.innerHTML = cc;
  showToast('tishi', '截图保存证书', 'slide6');
}

const showToast = (t, msg, p) => {
  let parent = document.getElementById(p);
  let toast = document.createElement('div');
  toast.innerHTML = msg;
  toast.className = `toast ${t}`;
  parent.appendChild(toast);
  setTimeout(() => {
    parent.removeChild(toast);
  }, 2000);
}