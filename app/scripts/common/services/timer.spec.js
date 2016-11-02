describe('common/services/timer.js', function() {
  var Timer;
  var $timeout;
  var clock;
  beforeEach(module('pomodoro.common'));
  beforeEach(inject(function(_$timeout_, _Timer_) {
    Timer = _Timer_;
    $timeout = _$timeout_;
  }));

  it('start and pause then done', function() {
    clock = new Timer.Clock(10);

    var startMsec = Date.now();
    var stub = sinon.stub(Date, 'now');
    stub.onCall(0).returns(startMsec);
    // after 1 sec
    stub.onCall(1).returns(startMsec + 1000);
    // after 10 minx
    stub.onCall(2).returns(startMsec + (60 * 1000 * 10));

    clock.start();
    $timeout.flush(1000);
    expect(clock.isCounting).toBe(true);
    expect(clock.isEnd).toBe(false);

    $timeout.flush(60 * 1000 * 10);
    expect(clock.isCounting).toBe(false);
    expect(clock.isEnd).toBe(true);

    expect(clock.remaining.minutes).toBe(0);
    expect(clock.remaining.seconds).toBe(0);

    stub.reset();
  });
});
