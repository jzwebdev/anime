//import anime from '../../src/index.js';

/* Ontersection observer */

!function(t,e){"use strict";function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||a(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;n?this.intersectionRatio=o/n:this.intersectionRatio=this.isIntersecting?1:0}function i(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=r(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function o(){return t.performance&&performance.now&&performance.now()}function r(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function s(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function h(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t,e){var n=Math.max(t.top,e.top),i=Math.min(t.bottom,e.bottom),o=Math.max(t.left,e.left),r=Math.min(t.right,e.right),s=r-o,h=i-n;return s>=0&&h>=0&&{top:n,bottom:i,left:o,right:r,width:s,height:h}}function u(t){var e;try{e=t.getBoundingClientRect()}catch(n){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):a()}function a(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var f=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.observe=function(t){var e=this._observationTargets.some(function(e){return e.element==t});if(!e){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||0>t||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,h(t,"resize",this._checkForIntersections,!0),h(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():a();this._observationTargets.forEach(function(i){var r=i.element,s=u(r),h=this._rootContainsTarget(r),c=i.entry,a=t&&h&&this._computeTargetAndRootIntersection(r,e),l=i.entry=new n({time:o(),target:r,boundingClientRect:s,rootBounds:e,intersectionRect:a});c?t&&h?this._hasCrossedThreshold(c,l)&&this._queuedEntries.push(l):c&&c.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var o=u(n),r=o,s=p(n),h=!1;!h;){var a=null,l=1==s.nodeType?t.getComputedStyle(s):{};if("none"==l.display)return;if(s==this.root||s==e?(h=!0,a=i):s!=e.body&&s!=e.documentElement&&"visible"!=l.overflow&&(a=u(s)),a&&(r=c(a,r),!r))break;s=p(s)}return r}},i.prototype._getRootRect=function(){var t;if(this.root)t=u(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||n>r!=i>r)return!0}},i.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},i.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},i.prototype._registerInstance=function(){f.indexOf(this)<0&&f.push(this)},i.prototype._unregisterInstance=function(){var t=f.indexOf(this);-1!=t&&f.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=n}(window,document);

function isElementInViewport(el, inCB, outCB) {
  function handleIntersect(entries, observer) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      if (inCB && typeof inCB === 'function') inCB(el, entry);
    } else {
      if (outCB && typeof outCB === 'function') outCB(el, entry);
    }
  }
  var observer = new IntersectionObserver(handleIntersect);
  observer.observe(el);
}

function fitToScreen(el, marginX) {
  anime.setValue(el, { scale: 1 });
  var elWidth = el.offsetWidth;
  var screenWidth = window.innerWidth;
  var limitWidth = screenWidth - marginX;
  if (elWidth > limitWidth) {
    var scaleRatio = limitWidth / elWidth;
    anime.setValue(el, { scale: scaleRatio });
  }
}

function sphereAnimation() {

  var sphereEl = document.querySelector('.sphere');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;

  var aimations = [];

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          translateX: [2, -3],
          translateY: [2, -3],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    begin: breathAnimation.play,
  })
  .add({
    targets: sphereEl,
    translateX: [60, 0],
    translateY: [60, 0],
    translateZ: [0, 0],
    duration: 3000,
    easing: 'easeOutSine',
  }, 0)
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 1000,
      easing: 'easeInOutCirc',
      delay:  function(el, i, t) {
        return (t - i) * 50
      }
    },
    opacity: [.001, 1],
    duration: 750,
    delay:  function(el, i, t) {
      return (t - i) * 80
    },
    easing: 'linear'
  }, 0);

  isElementInViewport(sphereEl, breathAnimation.play, breathAnimation.pause);

}

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');

  fitToScreen(logoAnimationEl, 24);

  var resizeTimeout = null;

  window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      fitToScreen(logoAnimationEl, 24);
    }, 1);
  });

  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', { translateX: 448, translateY: -100 });

  var siteAnimation = anime.timeline({
    duration: 750,
    autoplay: false,
    begin: sphereAnimation,
    complete: function() { 
      document.body.classList.add('is-ready');
      featuresAnimations();
    }
  })
  .add({
    targets: '.site-header',
    opacity: [.001, 1],
    easing: 'linear',
    duration: 10
  }, 0)
  .add({
    targets: '.header-bottom-line',
    opacity: {
      value: [1, .2],
      delay: 0,
      duration: 400,
      easing: 'easeOutQuad'
    },
    scaleX: [0, 1],
    easing: 'cubicBezier(.655, .405, .03, .945)',
    duration: 650
  }, 0)
  .add({
    targets: ['.header-nav-left a', '.mini-logo-link','.header-nav-right a'],
    opacity: [0.001, 1],
    translateY: {value: ['3rem', 0], duration: 800, easing: 'easeOutElastic(1, .6)'},
    translateZ: [0, 0],
    delay: function(el, i, t) {
      var delay = Math.abs(Math.round((t / 2) - i - 1)) * 40;
      return delay;
    }
  }, 20)
  .add({
    targets: '.logo-nav a',
    opacity: [0.001, 1],
    translateY: {value: ['3rem', 0], duration: 800, easing: 'easeOutElastic(1, .6)'},
    translateZ: [0, 0],
    delay: function(el, i, t) { return (t - i) * 40 },
    endDelay: 1200
  }, 20);

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false
  })
  .add({
    targets: '.letter-i .line',
    duration: 0,
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, 0)
  .add({
    targets: '.bounced',
    transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    translateY: [
      {value: [128, -128], duration: 200, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: 4, duration: 120, easing: 'easeInQuad'},
      {value: 1, duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.55, .85], duration: 190, easing: 'easeOutSine'},
      {value: 1.076, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.8, 1.3], duration: 120, easing: 'easeOutSine'},
      {value: .7, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: 1.05, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: 1, duration: 250, delay: 15, easing: 'easeOutQuad'}
    ],
    translateZ: 0,
    delay: function(el, i) { return i * 45 }
  }, 300)
  .add({
    targets: '.dot',
    opacity: {
      value: 1,
      duration: 100
    },
    translateY: 268,
    translateZ: 0,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
    duration: 320,
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)'
  }, '-=490')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 },
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, '-=330')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i'],
    translateX: 0,
    easing: 'easeOutElastic(1, .8)',
    duration: 800,
    delay: function(el, i, t) { return (t - i) * 20 },
    change: function(a) {  a.animatables[2].target.removeAttribute('stroke-dasharray'); }
  }, '-=600')
  .add({
    targets: '.letter-e',
    translateX: 0,
    easing: 'easeOutElastic(.8, .7)',
    duration: 800
  }, '-=840')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    translateZ: 0,
    rotate: '1turn',
    scaleX: [
      { value: 1, duration: 50, easing: 'easeOutSine' }
    ],
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800
  }, '-=660')
  .add({
    targets: '.letter-i rect',
    opacity: 0.001,
    duration: 1,
    complete: siteAnimation.play
  })
  .add({
    targets: '.dot',
    scaleY: 1,
    scaleX: 1,
    translateY: [
      {value: 262, duration: 100, easing: 'easeOutSine'},
      {value: 244, duration: 1000, easing: 'easeOutElastic(1, .8)'}
    ]
  })
  .add({
    targets: '.letter-m .line',
    d: function(el) { return el.dataset.d3 },
    easing: 'spring(.2, 200, 3, 60)',
  }, '-=1904')
  .add({
    targets: '.letter-i .line',
    transformOrigin: ['50% 100% 0', '50% 100% 0'],
    d: function(el) { return el.dataset.d2 },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    duration: 80
  }, '-=1110')
  .add({
    targets: ['.letter-i', '.letter-n', '.letter-m', '.letter-a', '.letter-e'],
    translateY: [
      {value: 33, duration: 150},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .6)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i) { return Math.round(i / 2) * 30 }
  }, '-=1100')
  .add({
    targets: ['.anime-logo h2'],
    translateY: [-20, 0],
    opacity: 1,
    easing: 'easeOutElastic(1, .6)',
    duration: 1000
  }, '-=1010');

  // logoAnimationTL.seek(logoAnimationTL.duration);
  // siteAnimation.seek(siteAnimation.duration - 1000);

  logoAnimationEl.classList.add('is-visible');

  return logoAnimationTL;

})();

window.onload = logoAnimation.play;