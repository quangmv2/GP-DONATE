@extends('layouts.private')

@section('header_goback')
    <a href="{{ route('users.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('users.index') }}" class="breadcrumb-item"> Users</a>
@endsection

@section('title')
Detail User {{ $user->name }}
@endsection
@section('screen_name')
Detail User {{ $user->name }}
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Name:</strong>
                    {{ $user->name }}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Email:</strong>
                    {{ $user->email }}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Roles:</strong>
                    @if(!empty($user->getRoleNames()))
                        @foreach($user->getRoleNames() as $v)
                            <label class="badge badge-success">{{ $v }}</label>
                        @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection