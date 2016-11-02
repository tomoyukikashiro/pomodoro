(function() {
  'use strict';

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  angular
    .module('pomodoro.common')
    .factory('Audio', ['$http', function($http) {
      function Audio(src) {
        initAudio(src, this);
      }
      Audio.prototype.play = function() {
        this.source.start(0);
      };
      Audio.prototype.stop = function() {
        this.source.stop();
      };

      function initAudio(src, self) {
        $http.get(src, {
          responseType: 'arraybuffer'
        }).then(function(response) {
          context.decodeAudioData(response.data, function(buffer) {
            self.source = context.createBufferSource();
            self.source.buffer = buffer;
            self.source.connect(context.destination);
          });
        });
      }
      return Audio;
    }]);
})();
