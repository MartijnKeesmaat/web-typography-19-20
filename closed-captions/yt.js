const fx = false;
var player;

const w = 800;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-placeholder', {
    width: w,
    height: (w / 16) * 9,
    videoId: 'vrP-_T-h9YM',
    playerVars: {
      //start:
      //autoplay: '1'
      rel: 0,
      //playlist: 'taJ60kskkns,FG0fTKAqZ5g'
    },
    events: {
      onReady: initialize,
      onStateChange: broodjeAap,
    },
  });
}

const $bg = document.querySelector('.animated-bg');
const $redSpotlight1 = document.querySelector('.red-spotlight-1');
const $redSpotlight2 = document.querySelector('.red-spotlight-2');
const $overlay = document.querySelector('.overlay');

function broodjeAap(e) {
  const $video = document.querySelector('#video-placeholder');
  const $bgVid = document.querySelector('.bg-video');

  $bgVid.src += '&autoplay=1';
  // $bgVid.src += ;
  $bg.classList.add('--is-active');

  // console.log(e.data);
  if (e.data == 1 && fx) {
    $redSpotlight1.classList.add('--is-active');

    setTimeout(() => {
      $redSpotlight2.classList.add('--is-active');
    }, 14000);

    // setTimeout(() => {
    //   $video.style.transition = '8s all ease';
    //   $video.style.transform = 'scaleY(.7)';
    // }, 25000);

    setTimeout(() => {
      $video.style.display = 'none';
    }, 33000);

    setTimeout(() => {
      $bgVid.classList.toggle('--is-active');
    }, 39000);

    // Return video
    setTimeout(() => {
      $bgVid.classList.toggle('--is-active');
      $video.style.display = 'block';
    }, 72000);

    toggleOverlay(2, 'cyan');
    toggleOverlay(2.2, 'cyan');

    toggleOverlay(2.4, '#F2872D');
    toggleOverlay(2.5, '#F2872D');

    toggleOverlay(5, 'cyan');
    toggleOverlay(5.2, 'cyan');

    toggleOverlay(5.4, 'cyan');
    toggleOverlay(5.5, 'cyan');

    toggleOverlay(9, 'red', 'full');
    toggleOverlay(11, 'red', 'full');

    toggleOverlay(14, 'cyan');
    toggleOverlay(14.3, 'cyan');

    toggleOverlay(15.5, '#F2872D');
    toggleOverlay(17, '#F2872D');

    toggleOverlay(25, 'red');
    toggleOverlay(25.1, 'red');

    // $;

    // toggleOverlay(22, 'red');
    // toggleOverlay(14, 'red');
  }
}

function toggleOverlay(time, color, size) {
  setTimeout(() => {
    $overlay.classList.toggle('--is-active');
    $overlay.style.background = color;
    size ? ($overlay.style.width = window.innerWidth + 'px') : '';
    size ? ($overlay.style.height = window.innerHeight + 'px') : '';
  }, time * 1000);
}

function initialize() {
  // const video = document.getElementById('video-placeholder');

  // Copy the <li> element and its child nodes
  // var cln = video.cloneNode(true);

  // cln.classList.add('bg-video');
  // cln.currentTime = 10;
  // cln.src += '&t=0m20s';
  // Append the cloned <li> element to <ul> with id="myList1"
  // document.body.appendChild(cln);
  // Update the controls on load
  addSpans();

  // document.querySelector('.ytp-pause-overlay').style.display = 'none';
}

function addSpans() {
  var ps = document.querySelectorAll('#closed-captions p');
  var i = 0;
  var regex = /\S+/g;
  while (i < ps.length) {
    var str = ps[i].innerText;
    var result = str.replace(regex, function (a) {
      return '<span>' + a + '</span>';
    });
    ps[i].innerHTML = result;
    ps[i].classList.add('p' + i);
    i++;
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  var t = player.getCurrentTime();
  t = Math.floor10(t, -1);
  // for each paragraph we want to know:
  // (paragraph number, start time, end time, current time)

  //Officer K D 6 - 3 . 7. Let’s begin. Ready?
  var i = 0;
  while (i < captions.length) {
    pTimes(i, captions[i][0], captions[i][1], t);
    i++;
  }
  var i = 0;
  // console.log(soundsCustom);
  while (i < sounds.length) {
    sTimes(i, sounds[i], t);
    i++;
  }
  // Change 136.1 to the length of your own video in seconds
  if (t < 136.1) {
    setTimeout(() => {
      updateTimerDisplay();
    }, 100);
  }
}

function pTimes(num, startT, endT, curT) {
  var curP = document.querySelector('.p' + num);

  if (curT > endT && !curP.classList.contains('off')) {
    curP.classList.add('off');
    document.body.classList.remove(`caption${num}`);
  }
  if (curT < endT && curP.classList.contains('off')) {
    curP.classList.remove('off');
  }
  if (curT > startT && !curP.classList.contains('on')) {
    document.body.classList.add(`caption${num}`);
    curP.classList.add('on');
  }
  if (curT < startT && curP.classList.contains('on')) {
    curP.classList.remove('on');
  }
}

function sTimes(num, soundStarts, curT) {
  var soundClass = 'sound' + num;
  var b = document.querySelector('body');

  if (curT > soundStarts[0] && curT < soundStarts[1] && !b.classList.contains(soundClass)) {
    b.classList.add(soundClass);
  }
  if (curT > soundStarts[1] && b.classList.contains(soundClass)) {
    b.classList.remove(soundClass);
  }
}

(function () {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
