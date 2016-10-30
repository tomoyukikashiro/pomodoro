(function() {
  'use strict';

  angular
    .module('pomodoro.common')
    .service('Timer', Timer);

  /* @ngInject */
  function Timer($timeout) {
    var self = this;
    self.Clock = Clock;

    function Clock(deadline) {
      var _self = this;
      _self.deadline = Date.parse(deadline);
      _self.promise = undefined;
      _self.isCounting = false;
      _self.isEnd = false;
      _self.remaining = {};
      initRemaining(_self);
    }
    Clock.prototype.start = function() {
      this.isCounting = true;
      this.promise = $timeout(this.tick.bind(this, this.deadline), 1000);
    };
    Clock.prototype.pause = function() {
      this.isCounting = false;
      $timeout.cancel(this.promise);
    };
    Clock.prototype.tick = function(endTime) {
      var t = endTime - Date.now();
      if (t <= 0) {
        this.isCounting = false;
        this.isEnd = true;
        initRemaining(this);
        return;
      }
      this.remaining.total = t;
      this.remaining.days = Math.floor(t / (1000 * 60 * 60 * 24));
      this.remaining.hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      this.remaining.minutes = Math.floor((t / 1000 / 60) % 60);
      this.remaining.seconds = Math.floor((t / 1000) % 60);
      this.promise = $timeout(this.tick.bind(this, this.deadline), 1000);
    };
    function initRemaining(_self) {
      _self.remaining.total = 0;
      _self.remaining.days = 0;
      _self.remaining.hours = 0;
      _self.remaining.minutes = 0;
      _self.remaining.seconds = 0;
    }
  }
})();
