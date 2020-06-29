@extends('layouts.private')
@section('screen_name')
Users Management
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
    			<h6 class="card-title">Users</h6>
				<div>
		            <a class="btn btn-success" href="{{ route('users.create') }}"> Create New User</a>
		        </div>
			</div>
	        @if ($message = Session::get('success'))
			<div class="alert alert-success">
			  <p>{{ $message }}</p>
			</div>
			@endif

			<div class="table-responsive mb-2">
				<table id="table_user" class="table">
					<thead>
						 <tr>
						   <th>No</th>
						   <th>Name</th>
						   <th>Username</th>
						   <th>Email</th>
						   <th>Roles</th>
						   <th width="280px">Action</th>
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
    	$('#table_user').DataTable( {
    		'dom': '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
	        "processing": true,
	        "serverSide": true,
	        "ajax": "users-list",
	        "order": [[ 0, "desc" ]],
	        "columns": [
	        	{ "bSearchable": false, "data": "id" },
			    { "bSearchable": true, "data": "full_name" },
			    { "bSearchable": true, "data": "username" },
			    { "bSearchable": true, "data": "email" },
			    { "bSearchable": true, "data": "roles",
			    	"orderable": false,
				    "render": function(data, type, row, meta){
				    	var htmlRole = "";
				    	if(data && data.length > 0){
				    		for(var i = 0; i < data.length; i++){
				    			htmlRole += "<label class='badge badge-success'>"+data[i].show_name+"</label>"
				    		}
				    	}

			    		return htmlRole;
			    	}
			    },
			    { 
			    	"bSearchable": false, "data": "id",  "targets": -1,  
			    	"orderable": false,
			    	"render": function(data, type, row, meta){
			    		var htmlAction = "<a class='btn btn-primary mr-2' href='users/"+data+"/edit'>Edit</a>";
			    		if(data != 1){
			    			htmlAction += "<form method='POST' action='users/"+data+"' accept-charset='UTF-8' style='display:inline' class='form_delete'><input name='_method' type='hidden' value='DELETE'><input name='_token' type='hidden' value='"+_csrfToken+"'><input class='btn btn-danger btn_delete_user' type='button' value='Delete'></form>";
			    		} else {
							htmlAction = "";
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
    	$(document).on('click', '.btn_delete_user', function(){
    		var form = $(this).closest('form');
    		bootbox.confirm("Are you sure to want to delete" , function(result) {
		    	if(result){
                    $(form).submit();
                }
		    });
    	});
	} );
</script>

@endsection