@extends('layouts.private')

@section('screen_name')
Events Management
@endsection

@section('custom_javascript')
<!-- Theme JS files -->
    <script src="{{asset('global_assets/js/plugins/ui/moment/moment.min.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/pickers/daterangepicker.js')}}"></script>

    <script src="{{asset('global_assets/js/plugins/tables/datatables/datatables.min.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/calendar/lunar.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/bootbox/5.3.2/bootbox.min.js')}}"></script>
@endsection


@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">Events</h6>
                <div>
                    @can('post-create')
                    <a class="btn btn-success" href="{{ route('events.create') }}">Create New Event</a>
                    @endcan
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div id="calendar_lunar"></div>
                    </div>
                    <div class="col-md-8">
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
                                
                        <div class="form-group">
                            <label>Date Filter:</label>
                            <div class="input-group">
                                <span class="input-group-prepend">
                                    <span class="input-group-text"><i class="icon-calendar22"></i></span>
                                </span>
                                <input name="filter_date" type="text" class="form-control daterange-single" value="">
                            </div>
                        </div>
                        <div class="table mb-2">
                          
                            </div>
                            <table id="table_events" class="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th style="width:200px;">Action</th>
                                    </tr>
                                </thead>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>


@endsection
@section('custom_code_javascript')
<script language="JavaScript">
    var _csrfToken = "{{ csrf_token('some-name') }}";

    //init Calendar
    setOutputSize("big");
    setElementWrapper(document.getElementById('calendar_lunar'));
    printSelectedMonth();

    var dataTableEvent = null;

    $(document).ready(function() {
        dataTableEvent = $('#table_events').DataTable( {
            'dom': '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "ajax": { 
                'url': "events-list",
                "data": function(data)
                {

                    var status = $('#status').val();
                    data.searchByStatus = status;
                  // Read values
                  data.filterdate = $('input[name="filter_date"]').val();
               }
            },
            "order": [[ 0, "desc" ]],
            "columns": [
                { "bSearchable": false, "data": "id" },
                { "bSearchable": true, "data": "name" },
                { "bSearchable": true, "data": "start_date" },
                { "bSearchable": true, "data": "end_date" },
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
                        var htmlAction = "<a class='btn btn-primary mr-2' href='events/"+data+"/edit'>Edit</a>";
                        htmlAction += "<form method='POST' action='events/"+data+"' accept-charset='UTF-8' style='display:inline' class='form_delete'><input name='_method' type='hidden' value='DELETE'><input name='_token' type='hidden' value='"+_csrfToken+"'><input class='btn btn-danger btn_delete_post' type='button' value='Delete'></form>";
                        
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


        $('input[name="filter_date"]').daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            locale: {
              cancelLabel: 'Clear'
            }
          });

          $('input[name="filter_date"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
            setTimeout(function(){
                dataTableEvent.draw();
            }, 200);
          });

          $('input[name="filter_date"]').on('cancel.daterangepicker', function(ev, picker) {
              $(this).val('');
              dataTableEvent.draw();
          });
          $('input[name="filter_date"]').change(function(){
                dataTableEvent.draw();
          })

          $(document).on('click', '.ngaythang, .homnay', function(){
            var date  = $(this).attr('solardate');
            var month  = $(this).attr('solarmonth');
            var year  = $(this).attr('solaryear');
            $('input[name="filter_date"]').val(date+'/'+month+'/'+year).change();

          });


          //get summary

          getSummaryEvent();

          $(document).on('click', '.change-time', function(){
            setTimeout(function(){
                getSummaryEvent();
            }, 200);
          })
          
        $(document).on('change', '#status',  function()
        {
            dataTableEvent.draw();
        });
    } );


      function getSummaryEvent(){
        $.ajax({
            type: "GET",
            url: "events-summary?month="+currentMonth+"&year="+currentYear,
            contentType: "application/json",
            dataType: "json",

            success: function(response) {
                var data = response.data;
                renderDataSummary(data);
            },
            error: function(response) {
                console.log(response);
            }
        });
      }

      function renderDataSummary(data){
        if(data.length > 0){
            $(data).each(function(index, sum){
                var arrayYear = sum.month_date.split("-").map(function(item) {
                    return parseInt(item, 10);
                });
                var tdElement = $('td[solaryear='+arrayYear[0]+'][solarmonth='+arrayYear[1]+'][solardate='+arrayYear[2]+']');
                $(tdElement).find('.sum').remove();
                $(tdElement).append('<div class="sum">'+sum.summary+'</div>')
            });

        }
      }


</script>
@endsection