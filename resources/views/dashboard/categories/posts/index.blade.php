@extends('layouts.private')
@section('screen_name')
Categories Management
@endsection
@section('content')

@php
$url = 'categories';
if(\Request::is('categories-audios')){
    $url = 'categories-audios';
}
if(\Request::is('categories-books')){
    $url = 'categories-books';
}
@endphp

<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">Categories</h6>
                <div>
                   <a class="btn btn-success" href="{{ route($url.'.create') }}"> Create New Categories</a>
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
                @foreach ($categories as $key => $category)
                <tr>
                    <td>{{ ++$i }}</td>
                    <td>{{ $category->name }}</td>
                    <td>

                        @can('role-edit')
                            <a class="btn btn-primary" href="{{ route($url.'.edit',$category->id) }}">Edit</a>
                        @endcan
                        @can('role-delete')
                            {!! Form::open(['method' => 'DELETE','route' => [$url.'.destroy', $category->id],'style'=>'display:inline']) !!}
                                {!! Form::submit('Delete', ['class' => 'btn btn-danger']) !!}
                            {!! Form::close() !!}
                        @endcan
                    </td>
                </tr>
                @endforeach
            </table>
            <div class="pagination-wrapper">
                {!! $categories->render() !!}
            </div>
        </div>
    </div>
</div>
@endsection