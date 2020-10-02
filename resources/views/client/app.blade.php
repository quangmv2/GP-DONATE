<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{asset('favicon.png')}}" type="image/x-icon"/>
    <link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Generous People</title>
    <!-- <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css"> -->
    <script>
        window.onload = () => {
            document.getElementById('loading').style.display = "none";
        }
    </script>
    <style>
        .loading1 {
            flex: 1;
            display: flex;
            height: 100vh;
            width: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: -1;
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
    <div class="container">
        <div class="loading1" id="loading">
            <div class="loader" style="width: 40px; height: 40px">
            </div>
        </div>
        <div id="root"></div>
        <div id="text-desktop">
            <h2>Please use your smartphone device to have the best experience</h2>
        </div>
    </div>
    <script src="{{ asset('build/manifest.js') }}"></script>
    <script src="{{ asset('build/vendor.js') }}"></script>
    <script src="{{ asset('build/app.js') }}"></script>
    @if(config('app.env') == 'local')
    <script src="http://localhost:35729/livereload.js"></script>
    @endif
</body>
</html>