
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
          <form id="subscribe_form" class="teaser-form subscribe-form-wrapper" action="https://drcomgroup.us10.list-manage.com/subscribe/post?u=787d75c3a13a26c9c5e4d9bf7&amp;id=5817a44047" method="post" name="mc-embedded-subscribe-form">
            <div class="info-box-wrapper text-center">
              <h1 class="title"><img class="img-phone" src="images/teaser/hero_title.png" /></h1>
              <p class="info">Coming soon. Become a beta tester!</p>
            </div>
            <div class="main-form-wrapper">
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label invalid-first-time">
                <input class="mdl-textfield__input" type="text" name="FNAME" id="mce-FNAME" required>
                <label class="mdl-textfield__label" for="mce-FNAME">FULL NAME</label>
                <span class="icon icon-user-icon"></span>
              </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label invalid-first-time">
                <input class="mdl-textfield__input" type="email" id="mce-EMAIL" name="EMAIL" required>
                <label class="mdl-textfield__label" for="mce-EMAIL">YOUR EMAIL</label>
                <span class="icon icon-mail-icon"></span>
              </div>

              <div class="form-group ">
                <label class="form-group-label">How do you want to contribute</label>
                <div class="inline-flex-group">
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="mce-group[15453]-15453-0">
                    <input value="1" type="checkbox" id="mce-group[15453]-15453-0" class="mdl-checkbox__input" checked name="group[15453][1]">
                    <span class="mdl-checkbox__label">Mentoring</span>
                  </label>
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="mce-group[15453]-15453-1" >
                    <input value="2" type="checkbox" id="mce-group[15453]-15453-1" class="mdl-checkbox__input" name="group[15453][2]">
                    <span class="mdl-checkbox__label">Partnership</span>
                  </label>
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="mce-group[15453]-15453-2">
                    <input value="4" type="checkbox" id="mce-group[15453]-15453-2" class="mdl-checkbox__input" name="group[15453][4]">
                    <span class="mdl-checkbox__label">Donation</span>
                  </label>
                </div>
              </div>

              <div class="flex top-btns">
                <div id="mce-responses" class="clear">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <button id="teaser_submit_button" class="prime-btn" type="submit" value="Subscribe" name="subscribe">Subscribe now!</button>
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
          <li><a href="#"><img class="img-social" src="images/teaser/social/instagram.png" /></a></li>
          <li><a href="#"><img class="img-social" src="images/teaser/social/twitter.png" /></a></li>
        </ul>
        <span class="copyright-text">By © 2020 Generous People. All rights reserved.</span>
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
