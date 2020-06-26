@extends('layouts.layout')

@section('header')
	@include('layouts.partials.header')
@endsection

@section('sidebar')
	@include('layouts.partials.sidebar')
@endsection

@section('parent_content')
	@if(!(isset($enable_breadcrumb) && $enable_breadcrumb == false))
	<div class="page-header-content header-elements-md-inline">
		<div class="page-title d-flex">
			<h4>@yield('header_goback') @yield('screen_name')</h4>
			<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
		</div>

	</div>
	<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
		<div class="d-flex">
			<div class="breadcrumb">
				<a href="{{asset('/')}}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
				@yield('middle_breadcrumb')
				<span class="breadcrumb-item active">@yield('screen_name')</span>
			</div>
		</div>
	</div>
	@endif
	<div class="content">
		@yield('content')
	</div>
@endsection