@extends('layouts.private')
@section('header_goback')
   @if(\Request::is('categories-audios/*'))
        <a href="{{ route('categories-audios.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @else if(\Request::is('categories-books/*'))
        <a href="{{ route('categories-books.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @else
        <a href="{{ route('categories.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
    @endif
@endsection

@section('middle_breadcrumb')
    @if(\Request::is('categories-audios/*'))
        <a href="{{ route('categories-audios.index') }}" class="breadcrumb-item"> Categories</a>
    @else if(\Request::is('categories-books/*'))
        <a href="{{ route('categories-books.index') }}" class="breadcrumb-item"> Categories</a>
    @else
        <a href="{{ route('categories.index') }}" class="breadcrumb-item"> Categories</a>
    @endif
@endsection

@section('screen_name')
Category Detail
@endsection
@section('content')
<div class="card">
    <div class="card-body">

        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Name:</strong>
                    {{ $category->name }}
                </div>
            </div>
             <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Description:</strong>
                    <div>{{ $category->description }}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Image Feature:</strong>
                    <div id="image_preview">
                        @if($category->feature_image !="")
                            <img src="{{$category->feature_image}}">
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection