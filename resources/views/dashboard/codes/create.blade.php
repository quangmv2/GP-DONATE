@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('codes.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('codes.index') }}" class="breadcrumb-item"> Codes</a>
@endsection

@section('title')
Create Code
@endsection
@section('screen_name')
Create Code
@endsection

@section('custom_stylesheet')
    <style>
        .btn-generate-code{
            min-width: 130px;
            max-width: 150px;
            margin-left: 10px
        }
        .text-btn {
            display: flex;
            align-items: center;
        }
        .loading-input{
            display: flex;
            width: 100%;
            position: relative;
        }
        .btn:active {
            opacity: 0.5;
        }
    </style>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There were some problems with your input.<br><br>
                <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
                </ul>
            </div>
        @endif
        {!! Form::open(array('route' => 'codes.store','method'=>'POST')) !!}
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Code:</strong>
                    <div class="text-btn">
                       <div class="loading-input">
                            {!! Form::text('code', null, array('placeholder' => 'Code','class' => 'form-control', 'id' => 'code')) !!}
                            <div class="loading1" id="loading" style="justify-content: flex-end">
                                <div class="loader" style="width: 25px; height: 25px; margin-right: 10px"></div>
                            </div>
                       </div>
                        <button type="button" class="btn btn-success btn-generate-code" id="btn-generate-code">Generate Code</button>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Email:</strong>
                    {!! Form::text('email', null, array('placeholder' => 'Email','class' => 'form-control')) !!}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-success mr-2" name="status" value="1">Save</button>
                <button type="submit" class="btn btn-primary" name="status" value="0">Save And Send To Mail</button>
            </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>
@endsection

@section('custom_code_javascript')
    <script>
        function uuidv4() {
        return 'xyxyx-xyxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    $('#btn-generate-code').on( "click", function() {
        const firstTextBtn =  $(this).text();
        $(this).text(`${firstTextBtn}...`);
        const id = uuidv4();
        $('#code').val(id);
        $(this).text(`${firstTextBtn}`);
    });
    </script>
@endsection