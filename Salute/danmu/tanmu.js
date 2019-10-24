// 这里的图片路径，是相对于index.html的路径
const Avatar = './danmu/assets/icon-avatar.png';
const AvatarBoy = './danmu/assets/icon_avatar_boy.png';
const AvatarGirl = './danmu/assets/icon_avatar_girl.png';
const IconBoy = './danmu/assets/icon-boy.png';
const IconGirl = './danmu/assets/icon-girl.png';

const dmArr = [];

// 处理弹幕位置，页面加载时调用最好，避免后面忘记
function setDM () {
  // 处理弹幕参数
  const _b = dmData;
  for (let i = 0; i < _b.length; i++) {
    const time = Math.floor(Math.random() * 10);
    const _time = time < 6 ? 6 + i : time + i;
    const top = Math.floor(Math.random() * 80) + 2;
    const _p = {
      id: _b[i].id,
      sex: _b[i].sex,
      content: _b[i].content,
      zanNumber: _b[i].zanNumber,
      top,
      time: _time,
    };
    dmArr.push(_p);
  }
}

/*
参数： parent  要添加弹幕的父节点的id
*/
function appendTanmu (parent) {
  dmArr.map((item, i) => {
    var avatar = document.createElement('img')
    avatar.setAttribute('class', 'avatar')
    avatar.setAttribute('mode', 'aspectFit')
    if (item.sex == 0) {
      avatar.setAttribute("src", AvatarBoy);
    } else {
      avatar.setAttribute("src", AvatarGirl);
    }

    var sex = document.createElement('img')
    sex.setAttribute('class', 'sex')
    sex.setAttribute('mode', 'aspectFit')
    if (item.sex == 0) {
      sex.setAttribute("src", IconBoy);
    } else {
      sex.setAttribute("src", IconGirl);
    }

    var avatarBox = document.createElement('div')
    avatarBox.setAttribute('class', 'avatarBox')

    avatarBox.appendChild(avatar)
    avatarBox.appendChild(sex)

    var content = document.createElement('text')
    content.setAttribute('class', 'content')
    content.innerHTML = item.content

    var dm = document.createElement('div')
    dm.setAttribute('class', 'dm')

    dm.appendChild(avatarBox)
    dm.appendChild(content)

    var dmItem = document.createElement('div')
    dmItem.setAttribute('class', 'dmItem')

    dmItem.appendChild(dm)

    var dmGroup = document.createElement('div');
    dmGroup.setAttribute('class', 'dmGroup');
    // console.log(item.top, item.time, i)
    dmGroup.style.top = item.top + "%";
    let left = 100
    dmGroup.style.left = left + "%";
    let speed = Math.random()
    while (speed > 0.7 || speed < 0.2) {
      speed = Math.random()
    }
    let timer = setInterval(function () {
      if (left < -100) {
        clearInterval(timer);   	//终止定时器
        left = 100;								// 为了展示效果，不进行暂停，一直循环
      }
      left -= speed;
      dmGroup.style.left = left + "%";
    }.bind(this), 1000 / 70);

    dmGroup.appendChild(dmItem)

    const page = document.getElementById(parent)

    page.appendChild(dmGroup)

  })

}