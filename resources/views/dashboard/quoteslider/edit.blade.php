@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('quoteslider.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('quoteslider.index') }}" class="breadcrumb-item"> Quotes</a>
@endsection

@section('screen_name')
Edit Quote
@endsection

@section('custom_stylesheet')

@endsection

@section('custom_javascript')
<script src="{{asset('global_assets/js/plugins/sortable/sortable.min.js')}}"></script>
<script src="{{asset('global_assets/js/plugins/sortable/jquery-sortable.js')}}"></script>
@endsection

@section('content')
<div class="card">
    <div class="card-body">

        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There were some problems with your input.<br><br>
                <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
                </ul>
            </div>
        @endif

        <form id="quoteslider_form" action="{{ route('quoteslider.update',$module->id) }}" method="POST">
          @csrf
          @method('PUT')
          {{ Form::hidden('quotes', '', array('class' => 'form-control hide', 'id' => 'quotes')) }}        
          <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12">
                  <div class="form-group">
                      <strong>Name:</strong>
                      {!! Form::text('name', $module->name, array('placeholder' => 'Name','class' => 'form-control')) !!}
                  </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12">
                  <div class="form-group">
                      <strong>Menu Items:</strong>
                      <div class="row drag-quote-wrapper">
                          <div class="col-md-3">
                              <div class="list_wrapper">
                                  <ul class="quote-original" id="list_menu">
                                      @foreach($quotes as $quoteinner)
                                        <li class="chapter-item list-group" data-id="{{$quoteinner->id}}">
                                             <span>{{ $quoteinner->quote}}</span>
                                             <button type="button" class="btn delete_quote">Delete</button>
                                        </li>
                                       @endforeach
                                  </ul>
                              </div>
                          </div>
                          <div class="col-md-9">
                              <div class="list_quote_result_wrapper">
                                  <ul id="list_quotes_result"  class="list-drag-result">
                                      @foreach($module->quotes as $quote)
                                           <li class="chapter-item list-group" data-id="{{$quote->id}}">
                                              <span>{{ $quote->quote}}</span>
                                              <button type="button" class="btn delete_quote">Delete</button>
                                          </li>
                                      @endforeach
                                  </ul> 
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                  <button type="button" class="btn btn-primary btn-submit-quote">Submit</button>
              </div>
          </div>
        </form>
    </div>
</div>

@endsection

@section('custom_code_javascript')
<script>
    $(document).ready(function()
    { 
        $('#list_menu').sortable({
            animation: 150,
            group: {
                name: 'shared',
                pull: 'clone',
                put: false // Do not allow items to be put into this list
            },
            sort: false 
        });

        $('#list_quotes_result').sortable({
            group: 'shared',
            animation: 150
        });
    });

    $(document).on('click', '.btn-submit-quote', function()
    {
        var data_quotes = [];
        $('#list_quotes_result li').each(function(index, value){
            data_quotes.push($(this).attr('data-id'));
        });

        $('#quotes').val(JSON.stringify(data_quotes));
        $('#quoteslider_form').submit();
    });

    $(document).on('click', '.delete_quote', function(){
      $(this).closest('li').remove();
    });

</script>
@endsection