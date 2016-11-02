(function() {
  'use strict';

  angular
    .module('pomodoro.common')
    .service('Timer', Timer);

  var defaultOptions = {
    onEnd: angular.noop,
    onDelete: angular.noop
  };

  /* @ngInject */
  function Timer($timeout) {
    var self = this;
    self.Clock = Clock;

    function Clock(targetMins, options) {
      var self = this;
      self.options = angular.extend(angular.copy(defaultOptions, {}), options);
      self.targetMsec = targetMins * 60 * 1000;
      self.promise = undefined;
      self.isCounting = false;
      self.isEnd = false;
      self.remaining = {};
      this.updateRemaining();
    }
    Clock.prototype.destroy = function() {
      this.pause();
      this.options.onDelete();
      delete this.options.onEnd;
      delete this.options.onDelete;
    };
    Clock.prototype.start = function() {
      var self = this;
      this.isCounting = true;
      var startMsec = Date.now();
      this.promise = $timeout(function() {
        self.tick(startMsec);
      }, 1000);
    };
    Clock.prototype.pause = function() {
      this.isCounting = false;
      $timeout.cancel(this.promise);
    };
    Clock.prototype.tick = function(startMsec) {
      var self = this;
      this.targetMsec -= calcPastMsec(startMsec);
      if (this.targetMsec <= 0) {
        this.isCounting = false;
        this.isEnd = true;
        this.updateRemaining();
        this.options.onEnd(this);
        return;
      }
      this.updateRemaining();
      startMsec = Date.now();
      this.promise = $timeout(function() {
        self.tick(startMsec);
      }, 1000);
    };
    Clock.prototype.updateRemaining = function() {
      if (this.targetMsec <= 0) {
        this.remaining.minutes = 0;
        this.remaining.seconds = 0;
      } else {
        this.remaining.minutes = Math.floor((this.targetMsec / 1000 / 60) % 60);
        this.remaining.seconds = Math.floor((this.targetMsec / 1000) % 60);
      }
    };
    function calcPastMsec(startMsec) {
      return Math.floor(((Date.now() - startMsec) / 1000) % 60) * 1000;
    }
  }
})();
