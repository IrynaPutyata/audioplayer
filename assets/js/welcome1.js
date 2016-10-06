// Audio player!! //
(function ($) {
  'use strict';

  var defaults = {};

  function Player(element, options) {
    this.element = element;
    this.$element = $(element);

    this.settings = $.extend({}, defaults, options || {});

    this.init();
  }

  Player.prototype = {
    init: function () {
      this.src = this.$element.data('src');

      this.render();
    },

    render: function () {
      var self = this;

      // Create audio element
      this.$audio = $('<audio src="' + this.src + '"></audio>');
      this.audio = this.$audio[0];

      this.$audio.appendTo(this.element);


      $('<i class="fa fa-play" aria-hidden="true"></i>').on('click', function (event) {
        event.preventDefault();

        self.play();

        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<i class="fa fa-pause" aria-hidden="true"></i></i>').on('click', function (event) {
        event.preventDefault();

        self.pause();
        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<i class="fa fa-stop" aria-hidden="true"></i>').on('click', function (event) {
        event.preventDefault();

        self.stop();

        $('.active', self.element).removeClass('active');
        $(this).addClass('active');
      }).appendTo(this.element);

      $('<div class="progressBar"><div class="currentProgress"></div></div>').appendTo(this.element);

      this.$audio.on('progress', function (event) {
        event.preventDefault();

        var perc = self.audio.currentTime * 100 / self.audio.duration;

        $('.currentProgress').css('width', perc + '%');
      });

      $('.progressBar', this.element).on('click', function (event) {
        event.preventDefault();

        self.audio.currentTime = self.audio.duration * (event.offsetX / $(this).width());
      });

      $('<i class="fa fa-volume-up" aria-hidden="true"></i>').appendTo(this.element).on('click', function (event) {
        event.preventDefault();

        self.audio.muted = !self.audio.muted;

        if (self.audio.muted) {
          $(this).removeClass('fa-volume-up');
          $(this).addClass('fa-volume-off');
        }
        else {
          $(this).addClass('fa-volume-up');
          $(this).removeClass('fa-volume-off');
        }
      }).appendTo(this.element);

      $('<div class="volumeProgress"><div class="currentVolume"></div></div>').appendTo(this.element);

      this.$audio.on('volumechange', function (event) {
        event.preventDefault();

        var volPerc = self.audio.volume * 100;

        $('.currentVolume').css('width', volPerc + '%');
      });

      $('.volumeProgress', this.element).on('click', function (event) {
        event.preventDefault();

        self.audio.volume = event.offsetX / $(this).width();
      });

    },

    play: function () {
      this.audio.play();
    },

    pause: function () {
      this.audio.pause();
    },

    stop: function () {
      this.pause();
      this.audio.currentTime = 0;
    }

  };

  $.fn.Player = function (options) {
    return $(this).each(function () {
      return new Player(this, options);
    });
  }

})(jQuery);

$(function () {

  $('.player').Player({});

});
