@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('menus.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('menus.index') }}" class="breadcrumb-item"> Menus</a>
@endsection

@section('screen_name')
Create Menu
@endsection

@section('custom_javascript')
<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
<script src="{{asset('global_assets/js/plugins/sortable/jquery.mjs.nestedSortable.js')}}"></script>
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


        {!! Form::open(array('route' => 'menus.store','method'=>'POST', 'id'=>'form_menu')) !!}
        {{ Form::hidden('type', 'menu', array('class' => 'form-control hide', 'id' => 'type')) }}
        {{ Form::hidden('menus', Request::old('menus'), array('class' => 'form-control hide', 'id' => 'menus')) }}
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Name:</strong>
                    {!! Form::text('name', null, array('placeholder' => 'Name','class' => 'form-control')) !!}
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Menu Items:</strong>
                    <div class="row">
                        <div class="col-md-3">
                            <button type="button" class="btn_add_url btn btn-primary">Add Menu Item</button>
                        </div>
                        <div class="col-md-9">
                            <ol id="nestedMenu" class="custom-list list-group col nested-sortable dd">
                                @if(Request::old('menus'))
                                    @php
                                        $menus_decode = json_decode(Request::old('menus'));
                                        if(count($menus_decode) > 0):
                                            printMenu($menus_decode);
                                        endif;
                                    @endphp

                                @endif
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary btn-submit-menu">Submit</button>
            </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>

<div class="modal fade" id="modelMenuItem" tabindex="-1" role="dialog" aria-labelledby="modelMenuItem" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modelMenuItem">Edit Menu Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-menu-item" data-id="">
          <div class="form-group">
            <label for="menu-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="menu-name">
          </div>
          <div class="form-group">
            <label for="menu-url" class="col-form-label">Url:</label>
            <input type="text" class="form-control" id="menu-url">
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

    // Nested demo
var ns = null;
function makeMenuTree(){
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
                    url: $(this).attr('data-url'),
                    feature_image: $(this).attr('data-image'),
                    parent: parentId,
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
        <li class="list-group-item" data-id="${uniqueId}" data-name="New Menu Item" data-url="#" data-image="">
            <div class="dd-handle">
                <span class="item-name">New Menu Item</span>
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

    $('.form-menu-item').attr('data-id', $(menuItem).attr('data-id'));
    $('#menu-name').val($(menuItem).attr('data-name'));
    $('#menu-url').val($(menuItem).attr('data-url'));
    $('#menu-feature_image').val($(menuItem).attr('data-image'));
    $('#menu-feature_image').change();

    $('#modelMenuItem').modal('show');
});

$(document).on('click', '.btn-remove', function(){
    var menuItem = $(this).closest('.list-group-item');

    $(menuItem).remove();
});

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

$(document).on('click', '.btn-update-menu-item', function(e){
    var id = $('.form-menu-item').attr('data-id');
    var menuItem = $('.list-group-item[data-id='+id+']');

    $(menuItem).attr('data-name', $('#menu-name').val());
    $(menuItem).attr('data-url', $('#menu-url').val());
    $(menuItem).attr('data-image', $('#menu-feature_image').val());
    var itemName = $(menuItem).find('.item-name');
    $(itemName).text($('#menu-name').val());

    $('#modelMenuItem').modal('hide');
});

$(document).on('click', '.btn-submit-menu', function(e){
    e.preventDefault();
    getMenuTreeJson(true,  $('#nestedMenu'));
    $('#menus').val(JSON.stringify(objectMenu));
    $('#form_menu').submit(); 
});

</script>
@endsection