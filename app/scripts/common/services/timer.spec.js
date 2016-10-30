describe('common/services/timer.js', function() {
  var Timer;
  var $timeout;
  var clock;
  beforeEach(module('pomodoro.common'));
  beforeEach(inject(function(_$timeout_, _Timer_) {
    Timer = _Timer_;
    $timeout = _$timeout_;
  }));

  describe('#start', function() {
    it('clock will be end after two mins.', function() {
      var twoMinsAfterDay = new Date(Date.now() + 1000 * 60 * 2);
      var twoMinsAfterStr = twoMinsAfterDay.toISOString();
      spyOn(Date, 'now').and.returnValue(twoMinsAfterDay);
      clock = new Timer.Clock(twoMinsAfterStr);
      clock.start();
      expect(clock.isCounting).toBe(true);
      expect(clock.isEnd).toBe(false);
      $timeout.flush(1000 * 60 * 2);
      expect(clock.isCounting).toBe(false);
      expect(clock.isEnd).toBe(true);
      expect(clock.remaining.days).toBe(0);
      expect(clock.remaining.hours).toBe(0);
      expect(clock.remaining.minutes).toBe(0);
      expect(clock.remaining.seconds).toBe(0);
      Date.now.calls.reset();
    });
  });
});
