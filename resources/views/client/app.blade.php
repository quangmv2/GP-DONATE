<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{asset('favicon.png')}}" type="image/x-icon"/>
    <link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Generous People</title>
    <!-- <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css"> -->
</head>
<body>
    <div class="container">
        <div id="root"></div>
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>