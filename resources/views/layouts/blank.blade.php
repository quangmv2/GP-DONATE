@extends('layouts.layout')

@section('header')
	@include('layouts.partials.header')
@endsection

@section('parent_content')
	@yield('content')
@endsection