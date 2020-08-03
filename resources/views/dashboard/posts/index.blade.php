@extends('layouts.private')

@section('screen_name')
Posts Management
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
                <h6 class="card-title">Posts</h6>
                <div>
                    @can('post-create')
                    <a class="btn btn-success" href="{{ route('posts.create') }}"> Create New Post</a>
                    @endcan
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <div class="table mb-2">
                <div class="card-body pb-0">
                        <div class="row">
                            <div class="col-md-3">
                                <label class="mt-2">Status:</label>
                                <select name="status" id="status" class="browser-default custom-select custom-select-lg mb-2">
                                  <option value="all" selected>All</option>
                                  <option value="1">Publish</option>
                                  <option value="0">Hidden</option>
                                  <option value="-1">Trash</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label class="mt-2">Hastags:</label>
                                <select name="category" id="category" class="browser-default custom-select custom-select-lg mb-2">
                                  <option value="all" selected>All</option>
                                  @foreach($hastags as $hastag)
                                   <option value="{{$hastag->id}}">{{$hastag->value}}</option>
                                  @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <table id="table_posts" class="table">
                    <thead>
                        <tr>
                            <th style="max-width: 100px;">No</th>
                            <th style="min-width: 300px;">Title</th>
                            <th style="min-width: 300px;">Hastags</th>
                            <th style="max-width: 200px;">Due Day</th>
                            <th style="max-width: 50px;">Status</th>
                            <th style="min-width: 250px;">Action</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>
</div>
@endsection
@section('custom_code_javascript')

<script>
    var _csrfToken = "{{ csrf_token('some-name') }}";
    $(document).ready(function() {
        var _dataTable = $('#table_posts').DataTable( {
            'dom': '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "ajax": {
                'url' : "posts-list",
                "data" : function(data){
                    var status = $('#status').val();
                    var category = $('#category').val();

                    data.searchByStatus = status;
                    data.searchByCategory = category;
                },
            },
            "order": [[ 0, "desc" ]],
            "columns": [
                { "bSearchable": false, "data": "id" },
                { "bSearchable": true, "data": "title" },
                { "bSearchable": true, "data": "hastags",
                    "orderable": false,
                    "render": function(data, type, row, meta)
                    {
                        var htmlStatus="";
                        if(data && data.length > 0){
                            const length = data.length>5?5:data.length;
                            for (var i = 0; i < length; i++) {
                                htmlStatus += "<label class='badge badge-primary mr-1'>"+data[i].value+"</label>";
                            }
                            if (data.length>5) htmlStatus += "<label class='badge badge-primary mr-1'>...</label>";
                        }

                        return htmlStatus;
                    }
                },
                { "bSearchable": true, "data": "due_day"},
                { "bSearchable": true, "data": "status",
                    "orderable": false,
                    "render": function(data, type, row, meta){
                        var htmlStatus="";
                        // if(data == 0){
                        //     htmlStatus += "<label class='badge badge-secondary'>Draft</label>";
                        // }
                        if(data == 1){
                            htmlStatus += "<label class='badge badge-success'>Published</label>";
                        }
                        if(data == 0){
                            htmlStatus += "<label class='badge badge-light'>Hidden</label>";
                        }

                        return htmlStatus;
                    } 
                },
                { 
                    "bSearchable": false, "data": "id",  "targets": -1,  
                    "orderable": false,
                    "render": function(data, type, row, meta){

                        var htmlAction = "<a class='btn btn-primary mr-2' href='posts/"+data+"/edit'>Edit</a>";
                        if(row.status != 0){
                            htmlAction +=  "<a class='btn btn-secondary mr-2' href='posts/"+data+"/hidden'>Hidden</a>";
                            htmlAction += "<form method='POST'' action='posts/"+data+"' accept-charset='UTF-8' style='display:inline;' class='form_delete'><input name='_method' type='hidden' value='DELETE'><input name='_token' type='hidden' value='"+_csrfToken+"'><input class='btn btn-danger btn_delete_post' style='margin-top: 5px' type='button' value='Delete'></form>";
                        } else {
                            htmlAction +=  "<a class='btn btn-success mr-2' href='posts/"+data+"/show'>Show</a>";
                        }
                        
                        return htmlAction;
                    }
                },
            ],
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
            }
        } );
        $(document).on('click', '.btn_delete_post', function(){
            var form = $(this).closest('form');
            bootbox.confirm("Are you sure to want to delete" , function(result) {
                if(result){
                    $(form).submit();
                }
            });
        });

        $(document).on('change', '#status',  function(){
            _dataTable.draw();
        });

        $(document).on('change', '#category',  function(){
            _dataTable.draw();
        });
    } );
</script>
@endsection