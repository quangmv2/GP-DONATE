@extends('layouts.private')
@section('screen_name')
Menu Management
@endsection
@section('content')

<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">Roles</h6>
                <div>
                    <a class="btn btn-success" href="{{ route('menus.create') }}"> Create New Menu</a>
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
                @foreach ($modules as $key => $module)
                <tr>
                    <td>{{ ++$i }}</td>
                    <td>{{ $module->name }}</td>
                    <td>
                        @can('post-edit')
                            <a class="btn btn-primary" href="{{ route('menus.edit',$module->id) }}">Edit</a>
                        @endcan
                        @can('post-delete')
                            {!! Form::open(['method' => 'DELETE','route' => ['menus.destroy', $module->id],'style'=>'display:inline']) !!}
                                {!! Form::submit('Delete', ['class' => 'btn btn-danger']) !!}
                            {!! Form::close() !!}
                        @endcan
                    </td>
                </tr>
                @endforeach
            </table>
            <div class="pagination-wrapper">
                {!! $modules->render() !!}
            </div>
        </div>
    </div>
</div>
@endsection