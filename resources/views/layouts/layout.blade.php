
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
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	<link href="{{asset('global_assets/css/icons/icomoon/styles.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/bootstrap_limitless.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/layout.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/components.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/colors.min.css')}}" rel="stylesheet" type="text/css">
	<link href="{{asset('css/main.css')}}" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->

	<!-- Custom styles files -->
	@yield('custom_stylesheet')
	<!-- /theme styles files -->

	<!-- Core JS files -->
	<script src="{{asset('global_assets/js/main/jquery.min.js')}}"></script>
	<script src="{{asset('global_assets/js/main/bootstrap.bundle.min.js')}}"></script>
	<script src="{{asset('global_assets/js/plugins/loaders/blockui.min.js')}}"></script>
	<script src="{{asset('global_assets/js/plugins/editors/ckeditor/ckeditor.js')}}"></script>
	<script src="{{asset('global_assets/js/main/app.js')}}"></script> 

	@include('ckfinder::setup')
	<!-- /core JS files -->

	<!-- Custom JS files -->
	@yield('custom_javascript')
	<!-- /theme JS files -->

	<!-- Theme JS files -->
	 {{-- <script src="{{asset('js/app.js')}}"></script> --}}
	<script src="{{asset('js/custom.js')}}"></script>
	<!-- /theme JS files -->


</head>

<body>
	@yield('header')
	<!-- Page content -->
	<div class="page-content">
		@yield('sidebar')
		<!-- Main content -->
		<div class="content-wrapper">
		@yield('parent_content')
		</div>
	</div>
	@yield('custom_code_javascript')
</body>
</html>
