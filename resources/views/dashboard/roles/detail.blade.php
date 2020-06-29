@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('roles.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('roles.index') }}" class="breadcrumb-item"> Roles</a>
@endsection

@section('title')
Role Detail {{$role->show_name}}
@endsection
@section('screen_name')
Role Detail {{$role->show_name}}
@endsection
@section('content')
<div class="card">
    <div class="card-body">

        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Name:</strong>
                    {{ $role->name }}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Permissions:</strong>
                    @if(!empty($rolePermissions))
                        @foreach($rolePermissions as $v)
                            <label class="label label-success">{{ $v->name }},</label>
                        @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection