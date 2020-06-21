@extends('layouts.private')

@section('screen_name')
Pages Management
@endsection

@section('custom_javascript')
<!-- Theme JS files -->
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
    <script src="{{asset('global_assets/js/plugins/sortable/jquery.mjs.nestedSortable.js')}}"></script>
@endsection
@php

$pages = constants('page');
$page_section_type = constants('page_section_type');

$page_name = Request::get('page_name');
@endphp


@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="card">
            <div class="card-header header-elements-sm-inline">
                <h6 class="card-title">Pages</h6>
            </div>

            <div class="card-body">
              @if ($message = Session::get('success'))
                  <div class="alert alert-success">
                      <p>{{ $message }}</p>
                  </div>
              @endif

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
              {!! Form::open(array('route' => 'pages.store','method'=>'POST', 'id'=>'form_page')) !!}
                <div class="form-group mt-2">
                    <label>Page:</label>
                    <select name="name" id="name" class="form-control">
                      <option value="default" selected></option>
                      @foreach($pages as $page)
                        <option value="{{ $page['id'] }}" <?php echo $page['id'] === $page_name ? 'selected' : '' ?> >{{ $page['name'] }}</option>
                      @endforeach
                    </select>
                </div>
                
                {{ Form::hidden('type', 'menu', array('class' => 'form-control hide', 'id' => 'type')) }}
                {{ Form::hidden('pages', Request::old('pages'), array('class' => 'form-control hide', 'id' => 'pages')) }}
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Section Items:</strong>
                            <div class="row">
                                <div class="col-md-3">
                                    <button type="button" class="btn_add_url btn btn-primary" disabled>Add Section Item</button>
                                </div>
                                <div class="col-md-9">
                                    <ol id="nestedMenu" class="custom-list list-group col nested-sortable dd">
                                        @if(Request::old('pages'))
                                            @php
                                                $pages_decode = json_decode(Request::old('pages'));
                                                if(count($pages_decode) > 0):
                                                    printSection($pages_decode);
                                                endif;
                                            @endphp

                                        @elseif($current_page)
                                        @php
                                            $pages_decode = json_decode($current_page->content);
                                            if(count($pages_decode) > 0):
                                                printSection($pages_decode);
                                            endif;
                                        @endphp

                                        @endif
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" class="btn btn-primary btn-submit-menu" disabled>Submit</button>
                    </div>
                </div>
                
                {!! Form::close() !!}
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="modelMenuItem" tabindex="-1" role="dialog" aria-labelledby="modelMenuItem" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modelMenuItem">Edit Section Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-menu-item" data-id="">
          <div class="form-group">
            <label for="menu-name" class="col-form-label">Name:</label>
            <input name="section_name" type="text" class="form-control" id="section_name">
          </div>
          <div class="form-group">
            <label for="menu-url" class="col-form-label">Section Type:</label>
            <select name="section_type" id="section_type" class="form-control">
              @foreach($page_section_type as $type)
                <option value="{{ $type['id'] }}">{{ $type['name'] }}</option>
              @endforeach
            </select>
          </div>

          <div class="form-group">
            <label for="section_type_select" class="col-form-label">Type Select Data:</label>
            <select name="section_type_select" id="section_type_select" class="form-control">
              <option value="latest">latest</option>
              <option value="includes">Include Ids</option>
              <option value="features">Features</option>
              <option value="categories">Categories</option>
            </select>
          </div>

          <div class="form-group">
            <label for="section_include_ids" class="col-form-label">Includes Id:</label>
            <input name="section_include_ids" type="text" class="form-control" id="section_include_ids">
            <small class="text-muted">Example: 1,2,3,4</small>
          </div>

          <div class="form-group">
            <label for="menu-url" class="col-form-label">Feature Image:</label>
            <div class="feature-image-input-wrapper">
                <input type="text" class="form-control" id="menu-feature_image">
                <button type="button" class="btn btn-primary btn_feature_image" style="">Browse Server</button>
            </div>
            <div id="image_preview" class="modal-image-preview">
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-update-menu-item">Okay</button>
      </div>
    </div>
  </div>
</div>
@endsection
@section('custom_code_javascript')

<script>
    var _csrfToken = "{{ csrf_token('some-name') }}";
        // Nested demo
var ns = null;
function makeMenuTree(){
  if($('ol.nested-sortable')){
    ns = $('ol.nested-sortable').nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        helper: 'clone',
        items: 'li',
        opacity: .6,
        placeholder: 'placeholder',
        revert: 250,
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 2,
        isTree: true,
        expandOnHover: 700,
        startCollapsed: false,
    });
  }
   
}

makeMenuTree();
var objectMenu = [];
function getMenuTreeJson(isFirst, element, parentId = "", parentElement = null){
    
    if(isFirst){
        objectMenu = [];
    }
    var arrayElement = $(element).children('.list-group-item');

    if(arrayElement.length > 0){
        arrayElement.each(function(){
            var currentId = $(this).attr('data-id');
            var exists = objectMenu.filter(function(menu){ return menu.id === currentId });
            if(exists.length == 0){
                var pushElement = parentElement ? parentElement : objectMenu;
                pushElement.push({
                    id: currentId,
                    name: $(this).attr('data-name'),
                    type: $(this).attr('data-type'),
                    type_select: $(this).attr('data-type-select'),
                    includes: $(this).attr('data-includes'),
                    feature_image: $(this).attr('data-image'),
                    children: []
                });

                var indexElement =  pushElement.findIndex(x => x.id === currentId);
                var olElement = $(this).children('ol');
                if(olElement.length > 0){
                    getMenuTreeJson(false, olElement, currentId, pushElement[indexElement].children);
                }
            }
        });
    }
}


$(document).on('click', '.btn_add_url', function(){
    var uniqueId = generateStrings();
    $('#nestedMenu').append(`
        <li class="list-group-item" data-id="${uniqueId}" data-name="New Section Item" data-type="post" data-type-select="latest" data-includes="" data-image="">
            <div class="dd-handle">
                <span class="item-name">New Secion Item</span>
                <span>
                    <button type="button" class="btn btn-small btn-edit item" draggable="false">Edit</button>
                    <button type="button" class="btn btn-small btn-remove item" draggable="false">Delete</button>
                </span>
            </div>
        </li>
    `);
    makeMenuTree();
});

$(document).on('click', '.btn-edit', function(){
    var menuItem = $(this).closest('.list-group-item');
    var dataTypeSelect = $(menuItem).attr('data-type-select');

    $('.form-menu-item').attr('data-id', $(menuItem).attr('data-id'));
    $('#section_name').val($(menuItem).attr('data-name'));
    $('#section_type').val($(menuItem).attr('data-type'));
    $('#section_type_select').val(dataTypeSelect);
    $('#section_include_ids').val($(menuItem).attr('data-includes'));
    $('#menu-feature_image').val($(menuItem).attr('data-image'));
    $('#menu-feature_image').change();

    if(dataTypeSelect == "latest") {
      $('#section_include_ids').prop('disabled', true);
    }else {
      $('#section_include_ids').prop('disabled', false);
    }

    $('#modelMenuItem').modal('show');
});

$(document).on('click', '.btn-remove', function(){
    var menuItem = $(this).closest('.list-group-item');
    $(menuItem).remove();
});


$(document).on('click', '.btn-update-menu-item', function(e){
    var id = $('.form-menu-item').attr('data-id');
    var menuItem = $('.list-group-item[data-id='+id+']');

    $(menuItem).attr('data-name', $('#section_name').val());
    $(menuItem).attr('data-type', $('#section_type').val());
    $(menuItem).attr('data-type-select', $('#section_type_select').val());
    $(menuItem).attr('data-includes', $('#section_include_ids').val());
    $(menuItem).attr('data-image', $('#menu-feature_image').val());
    var itemName = $(menuItem).find('.item-name');
    $(itemName).text($('#section_name').val());

    $('#modelMenuItem').modal('hide');
});

$(document).on('change', '#section_type_select', function(e){
  var dataTypeSelect = $(this).val();
  if(dataTypeSelect == "latest") {
    $('#section_include_ids').prop('disabled', true);
  }else {
    $('#section_include_ids').prop('disabled', false);
  }
});

//feature image
$(document).on('click', '.btn_feature_image', function(){
    selectFileWithCKFinder( 'menu-feature_image' );
});

$(document).on('change','#menu-feature_image', function(){
    var imageUrl = $(this).val();
    if(imageUrl != ""){
        $('#image_preview').empty();
        $('#image_preview').html('<img src="'+imageUrl+'" /><span class="remove_image icon-cross3 "></span>');
    }else{
        $('#image_preview').empty();
    }
});

$(document).on('click', '.remove_image', function(e){
    $('#image_preview').empty();
    $('#menu-feature_image').val('.');
});

// submit
$(document).on('click', '.btn-submit-menu', function(e){
    e.preventDefault();
    getMenuTreeJson(true,  $('#nestedMenu'));
    $('#pages').val(JSON.stringify(objectMenu));
    console.log(objectMenu);
    $('#form_page').submit(); 
});

$(document).on('change', '#name', function(e){
  var url = window.location.href;  

  var pageName = $(this).val();
  window.location.search = "page_name="+pageName;
});

$(document).ready(function(){
  var valName = $('#name').val();

  if(valName != 'default' && valName != ""){
    $('.btn-submit-menu').attr('disabled', false);
    $('.btn_add_url').attr('disabled', false);
  }
});


</script>
@endsection