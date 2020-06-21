@extends('layouts.private')
@section('screen_name')
Role Management
@endsection
@section('content')


@if ($message = Session::get('success'))
    <div class="alert alert-success">
        <p>{{ $message }}</p>
    </div>
@endif

<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">Roles</h6>
                <div>
                    <a class="btn btn-success" href="{{ route('roles.create') }}"> Create New Role</a>
                </div>
            </div>
            @if ($message = Session::get('success'))
            <div class="alert alert-success">
              <p>{{ $message }}</p>
            </div>
            @endif
            <table class="table table-bordered">
              <tr>
                 <th>No</th>
                 <th>Name</th>
                 <th width="280px">Action</th>
              </tr>
                @foreach ($roles as $key => $role)
                <tr>
                    <td>{{ ++$i }}</td>
                    <td>{{ $role->name }}</td>
                    <td>
                        <!-- <a class="btn btn-info" href="{{ route('roles.show',$role->id) }}">Show</a> -->
                        @can('role-edit')
                            <a class="btn btn-primary" href="{{ route('roles.edit',$role->id) }}">Edit</a>
                        @endcan
                        @can('role-delete')
                            {!! Form::open(['method' => 'DELETE','route' => ['roles.destroy', $role->id],'style'=>'display:inline']) !!}
                                {!! Form::submit('Delete', ['class' => 'btn btn-danger']) !!}
                            {!! Form::close() !!}
                        @endcan
                    </td>
                </tr>
                @endforeach
            </table>
            <div class="pagination-wrapper">
                {!! $roles->render() !!}
            </div>
        </div>
    </div>
</div>
@endsection