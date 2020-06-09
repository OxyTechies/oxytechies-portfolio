(function ($) {
  "use strict";
    /* global variable */
    var soundEffects = false;
    var tick;

    /* sound effects */

    soundEffects = $("html").hasClass("sound-effects");

    if (soundEffects) {
      tick = document.createElement("audio");
      tick.setAttribute("src", $("html").data("audio-tick"));
    }
    

    // TOGGLE FULSCREEN
     $('.full-screen-wrap').on('click', function () {
      $(this).toggleClass('active');
      toggleFullScreen();
    });



    function toggleFullScreen() {
      if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
    // HOME MUSIC// ------------------------------
  // HOME MUSIC
  var music, isPlaying, isUserTurnedOffMusic, isLigtboxTurnedOffMusic, autoplayAllowed;
  function homeMusic() {

    music = document.getElementById("bg-music");
    
    if (music !== null) {

      var button = document.getElementById("toggle");
      function togglePlay() {
        if (isPlaying) {
          music.pause();
          isUserTurnedOffMusic = true;
        } else {
            music.volume = 0.2;
      music.play();
            isUserTurnedOffMusic = false;
        }
      }
      music.onplaying = function () {
        isPlaying = true;
        button.innerHTML = button.getAttribute("data-on-text");
        document.getElementById("music-animation").classList.add('on');
      };
      music.onpause = function () {
        isPlaying = false;
        button.innerHTML = button.getAttribute("data-off-text");
        document.getElementById("music-animation").classList.remove('on');
      };

      // Toggle Music
      var music_toggle = document.getElementById("play-music");
      music_toggle.addEventListener('click', function () {
        togglePlay();
      }, false);


      // autoplay
      if ($('#play-music').hasClass('autoplay') && (isUserTurnedOffMusic !== true) ) {
        music_toggle.click();
      } else {
        isUserTurnedOffMusic = true;
      }


      // Pause audio when the tab is inactive
      function addOnBlurListener(onBlurCallback, onFocusCallback) {
        var hidden, visibilityState, visibilityChange; // check the visiblility of the page
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden"; visibilityChange = "visibilitychange"; visibilityState = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
          hidden = "mozHidden"; visibilityChange = "mozvisibilitychange"; visibilityState = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden"; visibilityChange = "msvisibilitychange"; visibilityState = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden"; visibilityChange = "webkitvisibilitychange"; visibilityState = "webkitVisibilityState";
        }

        if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
          // not supported
        } else {
          document.addEventListener(visibilityChange, function () {
            switch (document[visibilityState]) {
              case "visible":
                if (onFocusCallback) onFocusCallback();
                break;
              case "hidden":
                if (onBlurCallback) onBlurCallback();
                break;
            }
          }, false);
        }
      }

      function muteAudio() {
        music.pause();
      }

      function unMuteAudio() {
        if (!isUserTurnedOffMusic && !isLigtboxTurnedOffMusic) {
          music.play();
        }
      }

      addOnBlurListener(muteAudio, unMuteAudio);

    }

  }

    // MOUSE CLCIK RIPPLE EFFECT
    if ($('html').data("click-ripple-animation") === "yes") {
      $("html").append('<i class="ripple"></i>');
      $("html").on("mousedown", function (e) {
        $("i.ripple").addClass("active").css("left", e.pageX).css("top", e.pageY);
      });

      $("i.ripple").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
        return $("i.ripple").removeClass("active");
      });
    }
  

  // navbar on scroll
  $(window).trigger('scroll');
  $(window).on('scroll', function () {
    var pixels = 50; 
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar').addClass('navbar-reduce');
      $('.navbar').removeClass('navbar-trans');
    } else {
      $('.navbar').addClass('navbar-trans');
      $('.navbar').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

    // navigation active
    $('[dd-toggle]').on('click', function() {
      var menu_id = $(this).attr('dd-toggle');
      $('#'+menu_id).toggleClass('in');
      $(this).toggleClass('in');

      // Play Sound Effect
        if (soundEffects) {
          tick.play();
        }
    });



  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#pre-ripple').addClass('loaded');
      $('.bg-music-text').addClass('loaded');
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

 // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();


 
  // Skills section
    $('.bar .progress').each(function() {
      $(this).css("width", $(this).attr("data-percent") + '%');
    });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
  // Contact Form

  $(function() {

  // Get the form.
  var form = $('#contact-form');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });

  });

});



  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

