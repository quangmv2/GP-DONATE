@extends('layouts.private')
@section('header_goback')
    @if(\Request::is('categories-audios/*'))
        <a href="{{ route('categories-audios.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @elseif(\Request::is('categories-books/*'))
        <a href="{{ route('categories-books.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @else
        <a href="{{ route('categories.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @endif
@endsection

@section('middle_breadcrumb')
    @if(\Request::is('categories-audios/*'))
        <a href="{{ route('categories-audios.index') }}" class="breadcrumb-item"> Categories</a>
    @elseif(\Request::is('categories-books/*'))
        <a href="{{ route('categories-books.index') }}" class="breadcrumb-item"> Categories</a>
    @else
        <a href="{{ route('categories.index') }}" class="breadcrumb-item"> Categories</a>
    @endif
@endsection

@section('screen_name')
Create Category
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


        
        @if(\Request::is('categories-audios/*'))
        {!! Form::open(array('route' => 'categories-audios.store','method'=>'POST')) !!}
        {{ Form::hidden('type', constants('post_type.audio'), array('class' => 'form-control hide')) }}
        @elseif(\Request::is('categories-books/*'))
        {!! Form::open(array('route' => 'categories-books.store','method'=>'POST')) !!}
        {{ Form::hidden('type', constants('post_type.book'), array('class' => 'form-control hide')) }}
        @else
        {!! Form::open(array('route' => 'categories.store','method'=>'POST')) !!}
        {{ Form::hidden('type', constants('post_type.post'), array('class' => 'form-control hide')) }}
        @endif
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Name:</strong>
                    {!! Form::text('name', null, array('placeholder' => 'Name','class' => 'form-control')) !!}
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12">
		        <div class="form-group">
		            <strong>Description:</strong>
		            {!! Form::textarea('description', null, ['id' => 'description', 'class' => 'form-control','placeholder' => 'Description', 'style' => 'height:150px']) !!}
		        </div>
		    </div>
		    <div class="col-xs-12 col-sm-12 col-md-12">
		    	<div class="form-group">
                    <strong>Image Feature:</strong>
                    <button type="button" class="btn btn-primary btn_feature_image" style="">Browse Server</button>
                    {{ Form::hidden('feature_image', '', array('class' => 'form-control hide', 'id' => 'feature_image')) }}
                    <div id="image_preview" class="max-width-400">
                        @if(old('feature_image'))
                        <img src="{{old('feature_image')}}" /><span class="remove_image icon-cross3 remove" ></span>
                        @endif
                    </div>
                </div>
		    </div>

            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>
@endsection

@section('custom_code_javascript')
<script>
    $(document).on('click', '.btn_feature_image', function(){
        selectFileWithCKFinder( 'feature_image' );
    });

    $(document).on('change','#feature_image', function(){
        var imageUrl = $(this).val();
        if(imageUrl != ""){
            $('#image_preview').empty();
            $('#image_preview').html('<img src="'+imageUrl+'"><span class="remove_image list-icons-item" data-action="remove"></span>');
        }else{
            $('#image_preview').empty();
        }
    });

    $(document).on('click', '.remove_image', function(){
        $('#image_preview').empty();
        $('feature_image').val('');
    });
</script>
@endsection