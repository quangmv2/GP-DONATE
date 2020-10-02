
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" href="{{asset('favicon.png')}}" type="image/x-icon"/>
	<title>@yield('title') - Generous People</title>

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
	<link href="{{asset('css/bootstrap-tagsinput.css')}}" rel="stylesheet" type="text/css">

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
	<script src="{{asset('js/moment.js')}}"></script> 

	{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> --}}
	{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script> --}}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js"></script>
	<script src="{{ asset('js/bootstrap-tagsinput-angular.min.js') }}"></script>
	<script src="{{asset('js/bootstrap-tagsinput.min.js')}}"></script>
	{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/rainbow.min.js"></script> --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/language/generic.js"></script> --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/language/html.js"></script> --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/rainbow/1.2.0/js/language/javascript.js"></script> --}}
	{{-- <script src="{{ asset('assets/app.js') }}"></script> --}}
    {{-- <script src="{{ asset('assets/app_bs3.js') }}"></script> --}}

	@include('ckfinder::setup')
	<!-- /core JS files -->

	<!-- Custom JS files -->
	@yield('custom_javascript')
	<!-- /theme JS files -->

	<!-- Theme JS files -->
	 {{-- <script src="{{asset('js/app.js')}}"></script> --}}
	<script src="{{asset('js/custom.js')}}"></script>
	<!-- /theme JS files -->
	<style>
		.btn {
			padding: 7px;
		}
        .loading1 {
            flex: 1;
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: absolute;
        }
        .loading1 p {
            flex: 1;
            background-color: red($color: #000000);
        }

        .loader {
            border: 5px solid #f3f3f3;
            border-radius: 50%;
            border-top: 5px solid #ddae53;
            /* width: 40px;
            height: 40px; */
            -webkit-animation: spin 1.5s linear infinite; /* Safari */
            animation: spin 1.5s linear infinite;
        }
        #text-desktop h2{
            color:#fff;
        }
        
        /* Safari */
        @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
	</style>

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
