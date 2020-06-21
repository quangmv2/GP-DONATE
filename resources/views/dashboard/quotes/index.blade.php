@extends('layouts.private')

@section('screen_name')
Quotes Management
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
                <h6 class="card-title">Quotes</h6>
                <div>
                    @can('post-create')
                    <a class="btn btn-success" href="{{ route('quotes.create') }}"> Create New Quotes</a>
                    @endcan
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <div class="table mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="mt-2">Status:</label>
                            <select name="status" id="status" class="browser-default custom-select custom-select-lg mb-2">
                                <option value="all" selected>All</option>
                                <option value="1">Publish</option>
                                <option value="0">Draft</option>
                                <option value="-1">Trash</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table id="table_posts" class="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Quote</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>
</div>

<script>
    var _csrfToken = "{{ csrf_token('some-name') }}";
    $(document).ready(function() {
        var _dataTable = $('#table_posts').DataTable( {
            'dom': '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "ajax":
            {
                'url' : "quotes-list",
                "data" : function(data)
                {
                    var status = $('#status').val();
                    data.searchByStatus = status;
                },
            },
            "order": [[ 0, "desc" ]],
            "columns": [
                { "bSearchable": false, "data": "id" },
                { "bSearchable": true, "data": "quote" },
                { "bSearchable": true, "data": "author" },
                { "bSearchable": true, "data": "status",
                    "orderable": false,
                    "render": function(data, type, row, meta){
                        var htmlStatus="";
                        if(data == 0){
                            htmlStatus += "<label class='badge badge-secondary'>Draft</label>";
                        }
                        if(data == 1){
                            htmlStatus += "<label class='badge badge-success'>Published</label>";
                        }
                        if(data == -1){
                            htmlStatus += "<label class='badge badge-success'>Trash</label>";
                        }
                        return htmlStatus;
                    } 
                },
                { 
                    "bSearchable": false, "data": "id",  "targets": -1,  
                    "orderable": false,
                    "render": function(data, type, row, meta){
                        var htmlAction = "<a class='btn btn-primary mr-2' href='quotes/"+data+"/edit'>Edit</a>";
                        htmlAction += "<form method='POST' action='quotes/"+data+"' accept-charset='UTF-8' style='display:inline' class='form_delete'><input name='_method' type='hidden' value='DELETE'><input name='_token' type='hidden' value='"+_csrfToken+"'><input class='btn btn-danger btn_delete_post' type='button' value='Delete'></form>";
                        
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

        $(document).on('change','#status',function()
        {
            _dataTable.draw();
        });
    } );
</script>
@endsection