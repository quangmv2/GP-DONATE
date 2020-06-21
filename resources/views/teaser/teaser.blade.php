
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Generous People - @yield('title')</title>

	 <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

	<!-- Global stylesheets -->
	<link href="{{asset('global_assets/css/icons/icomoon/styles.min.css')}}" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
	<link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
  <link href="{{asset('css/teaser.css')}}" rel="stylesheet" type="text/css">
  <link href="{{asset('css/icons/style.css')}}" rel="stylesheet" type="text/css">

	<script src="{{asset('global_assets/js/main/jquery.min.js')}}"></script>
	<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
	<script src="{{asset('global_assets/js/main/bootstrap.bundle.min.js')}}"></script>

</head>

<body>
	<div class="container">

    <!----- header, logo and navbar menu -->

    <header class="header">
      <h2 class="logo"><img src="images/teaser/logo.png"></h2>
    </header>

    <!----- top content, title, description and buttons -->

    <div id="scene" data-relative-input="true" >
      <!-- left part-->
	    <img src="images/teaser/elements/0002_dot_graphic_left.png" data-depth='0.3' width="100%" class="img-left-1" />
	    <img src="images/teaser/elements/0000_circle_dot.png" data-depth='0.2' width="100%" class="img-left-2" />
      <img src="images/teaser/elements/0001_blue_ring.png" data-depth='0.1' width="60%" class="img-left-3" />
      
      <!-- top right part -->
	    <img src="images/teaser/elements/0007_wave.png" data-depth='0.3' width="100%" class="img-top-right-1" />
	    <img src="images/teaser/elements/0009_triangle.png" data-depth='0.2' width="100%" class="img-top-right-2" />
      <img src="images/teaser/elements/0008_2_rings.png" data-depth='0.1' width="100%" class="img-top-right-3" />
      <img src="images/teaser/elements/0010_2_circle.png" data-depth='0.3' width="100%" class="img-top-right-4" />
      <img src="images/teaser/elements/0004_dot_square.png" data-depth='0.2' width="100%" class="img-top-right-5" />

      <!-- top right part -->
      <img src="images/teaser/elements/0003_dot_graphic_right.png" data-depth='0.3' width="100%" class="img-bottom-right-1" />
	    <img src="images/teaser/elements/0006_9_dots.png" data-depth='0.2' width="100%" class="img-bottom-right-2" />
      <img src="images/teaser/elements/0005_line_curve.png" data-depth='0.1' width="100%" class="img-bottom-right-3" />
      <img src="images/teaser/elements/0013_blue_bubble.png" data-depth='0.3' width="100%" class="img-bottom-right-4" />
      <img src="images/teaser/elements/0011_dash_circle.png" data-depth='0.2' width="100%" class="img-bottom-right-5" />
      <img src="images/teaser/elements/0012_blue_circle.png" data-depth='0.1' width="100%" class="img-bottom-right-6" />

  	</div>


    <div class="section hero-section">
      <div class="row">
        <div class="col-md-7">
          <form id="subscribe_form" class="teaser-form subscribe-form-wrapper">
            <div class="info-box-wrapper text-center">
              <h1 class="title"><img class="img-phone" src="images/teaser/hero_title.png" /></h1>
              <p class="info">Coming soon. Become a beta tester!</p>
            </div>
            <div class="main-form-wrapper">
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label invalid-first-time">
                <input class="mdl-textfield__input" type="text" id="sample3" required>
                <label class="mdl-textfield__label" for="sample3">YOUR NAME</label>
                <span class="icon icon-user-icon"></span>
              </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label invalid-first-time">
                <input class="mdl-textfield__input" type="email" id="sample3" required>
                <label class="mdl-textfield__label" for="sample3">YOUR EMAIL</label>
                <span class="icon icon-mail-icon"></span>
              </div>

              <div class="form-group ">
                <label class="form-group-label">How do you want to contribute</label>
                <div class="inline-flex-group">
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-mentoring">
                    <input type="checkbox" id="checkbox-mentoring" class="mdl-checkbox__input" checked>
                    <span class="mdl-checkbox__label">Mentoring</span>
                  </label>
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-partnership">
                    <input type="checkbox" id="checkbox-partnership" class="mdl-checkbox__input">
                    <span class="mdl-checkbox__label">Partnership</span>
                  </label>
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-donation">
                    <input type="checkbox" id="checkbox-donation" class="mdl-checkbox__input">
                    <span class="mdl-checkbox__label">Donation</span>
                  </label>
                </div>
              </div>

              <div class="flex top-btns">
                <button id="teaser_submit_button" class="prime-btn" type="submit">Subscribe now!</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-5">
          <div class="phone-wrapper">
            <div class="real-phone-wrapper">
              <div class="phone-screen">
                  <img class="img-first img-phone" src="images/teaser/mockup_phone_shadow.png" />
                  <img class="img-phone" src="images/teaser/mockup_screen_2.png" />
                  <img class="img-phone phone-fade" src="images/teaser/mockup_screen_1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
      <div class="footer-wrapper">
        <ul class="social-list">
          <li><a href="#"><img class="img-social" src="images/teaser/social/facebook.png" /></a></li>
          <li><a href="#"><img class="img-social" src="images/teaser/social/google_plus.png" /></a></li>
          <li><a href="#"><img class="img-social" src="images/teaser/social/twitter.png" /></a></li>
        </ul>
        <span class="copyright-text">© 2020 WildAid. All rights reserved.</span>
      </div>
    </footer>
  </div>

  <!----- parallax container and  image elements,   -->

  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
  <script>

    var scene = document.getElementById('scene');
    var parallaxInstance = null;
    if( !isMobile() && $(window).width() > 768) {
      parallaxInstance = new Parallax(scene);
    }
  	
    
    $(document).ready(function(){
      setInterval(() => {
        $('.phone-fade').toggleClass('fade-out');
      }, 2500);
      $(document).on('input', '.mdl-textfield__input', function(){
        if($(this).parent().hasClass('invalid-first-time')){
          $(this).parent().removeClass("invalid-first-time");
        }
      });

      $(document).on('click', '#teaser_submit_button', function(){
        $('.mdl-textfield').removeClass("invalid-first-time");
      });

      $(window).resize(function(){
        if($(window).width() <= 768 && parallaxInstance){
          parallaxInstance.disable();
          
        }else if(!isMobile()){
          console.log(parallaxInstance);
          if(!parallaxInstance){
            parallaxInstance = new Parallax(scene);
          }else{
            parallaxInstance.enable();
          }
        }
      });
    });

    function isMobile(){
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    }
  </script>
</body>
</html>
