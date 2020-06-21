@extends('layouts.private')

@section('screen_name')
Quotes slider Management
@endsection

@section('custom_javascript')
<!-- Theme JS files -->
    <script src="{{asset('global_assets/js/plugins/tables/datatables/datatables.min.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/forms/selects/select2.min.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/bootbox/5.3.2/bootbox.min.js')}}"></script>
@endsection


@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">List</h6>
                <div>
                    @can('post-create')
                    <a class="btn btn-success" href="{{ route('quoteslider.create') }}"> Create New Quotes slider</a>
                    @endcan
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <div class="table mb-2">
                <table id="table_posts" class="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Quote</th>
                          <!--   <th>Author</th>
                            <th>Status</th> -->
                            <th>Action</th>
                        </tr>
                         @foreach ($modules as $key => $module)
                <tr>
                    <td>{{ ++$i }}</td>
                    <td>{{ $module->name }}</td>
                    <td>
                        @can('post-edit')
                            <a class="btn btn-primary" href="{{ route('quoteslider.edit',$module->id) }}">Edit</a>
                        @endcan
                        @can('post-delete')
                            {!! Form::open(['method' => 'DELETE','route' => ['quoteslider.destroy', $module->id],'style'=>'display:inline']) !!}
                                {!! Form::submit('delete', ['class' => 'btn btn-danger']) !!}
                            {!! Form::close() !!}
                        @endcan
                    </td>
                </tr>
                @endforeach
                    </thead>
                </table>

                 <div class="pagination-wrapper">
                {!! $modules->render() !!}
            </div>
            </div>
        </div>
    </div>
</div>


@endsection