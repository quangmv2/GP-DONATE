@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('books.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('books.index') }}" class="breadcrumb-item"> Books</a>
@endsection

@section('screen_name')
Edit Book
@endsection

@section('custom_javascript')
    <script src="{{asset('global_assets/js/plugins/sortable/sortable.min.js')}}"></script>
    <script src="{{asset('global_assets/js/plugins/sortable/jquery-sortable.js')}}"></script>
@endsection

@section('content')
<div class="card">
    <div class="card-body">

        @if ($errors->any())
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There were some problems with your input.<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif


        <form action="{{ route('books.update',$book->id) }}" method="POST">
        	@csrf
            @method('PUT')
            <div class="row">
                <div class="col-md-9">
                     <div class="row">
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Title:</strong>
                                {{ Form::text('title', $book->title, array('class' => 'form-control', 'placeholder' => 'Name')) }}
            		        </div>
            		    </div>
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Description:</strong>
                                {!! Form::textarea('description', $book->description, ['id' => 'description', 'class' => 'form-control','placeholder' => 'Description', 'style' => 'height:150px']) !!}
            		        </div>
            		    </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Content:</strong>
                                {!! Form::textarea('content', $book->content, ['id' => 'content', 'class' => 'form-control content-editor','placeholder' => 'Content']) !!}
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Title:</strong>
                                {{ Form::text('author', $book->author, array('id' => 'author', 'class' => 'form-control', 'placeholder' => 'Author')) }}
                            </div>
                        </div>
            		    <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Chapters:</strong><br/>
                                <a href="{{ route('books-chapter.create',['book_id' => $book->id]) }}" class="btn btn-primary" style="">Create Chapter</a>
                                @if(count($chapters) > 0)
                                <div class="chapter_wrapper">
                                    <ul id="list_chapter">
                                        @foreach($chapters as $chapter)
                                            <li class="chapter-item list-group" data-id="{{$chapter->id}}">
                                                <div>
                                                    <span>{{$chapter->title}}<span>
                                                    @if($chapter->status == 1)
                                                        <label class='badge badge-success'>Published</label>
                                                    @elseif($chapter->status == 0)
                                                        <label class='badge badge-secondary'>Draft</label>
                                                    @endif
                                                </div>
                                                <div>
                                                    <a href="{{ route('books-chapter.edit', $chapter->id)}}">Edit</a> | 
                                                    <a href="#" class="delete_chapter">Delete</a>
                                                </div>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                                @endif
                            </div>
                        </div>
            		</div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <strong>Categories:</strong>
                        <br/>
                        <div class="category_post_wrapper">
                            @foreach($categories as $value)
                                <label>{{ Form::checkbox('category[]', $value->id, in_array($value->id, $postCategories) ? true : false, array('class' => 'name')) }}
                                {{ $value->name }}</label>
                            <br/>
                            @endforeach
                        </div>
                    </div>

                    <div class="form-group">
                        <strong>Image Feature:</strong>
                        <button type="button" class="btn btn-primary btn_feature_image" style="">Browse Server</button>
                        {{ Form::hidden('feature_image', $book->feature_image, array('class' => 'form-control hide', 'id' => 'feature_image')) }}
                        <div id="image_preview">
                            @if($book->feature_image || old('feature_image'))
                            <img src="{{old('feature_image') ? old('feature_image') : $book->feature_image}}" /><span class="remove_image icon-cross3 remove" ></span>
                            @endif
                        </div>
                    </div>

                </div>
                {{ Form::hidden('chapters_order', '', array('class' => 'form-control hide', 'id' => 'chapters_order')) }}
                <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                    <button type="submit" class="btn btn-success mr-2" name="status" value="1">Submit</button>
                    <button type="submit" class="btn btn-primary" name="status" value="0">Save As Draft</button>
                </div>
            </div>

        </form>
    </div>
</div>
@endsection

@section('custom_code_javascript')
<script>
    var editor = CKEDITOR.replace( 'content' );
    CKFinder.setupCKEditor( editor );
    CKEDITOR.on( 'dialogDefinition', function( ev )
    {
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        if ( dialogName == 'link' || dialogName == 'image' )
        {
             // remove Upload tab
             dialogDefinition.removeContents( 'Upload' );
        }
        if ( dialogName == 'image' ){
            var infoTab = dialogDefinition.getContents( 'info' );
            if(infoTab){
                infoTab.remove( 'htmlPreview' );
            }
        }
    });

    $(document).on('click', '.btn_feature_image', function(){
        selectFileWithCKFinder( 'feature_image' );
    });

    $(document).on('click', '.btn_audio', function(){
        selectFileWithCKFinder( 'audio' );
    });

    $(document).on('change','#feature_image', function(){
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
        $('#feature_image').val('');
    });

    $(document).on('click', '.delete_chapter', function(e){
        e.preventDefault();

        $(this).closest('li').remove();
        reOrderChapterValue('#list_chapter li', '#chapters_order');
    });

    //SORTABLE

    $(document).ready(function(){
        reOrderChapterValue('#list_chapter li','#chapters_order');
        $('#list_chapter').sortable({
            selectedClass: 'selected', // The class applied to the selected items
            animation: 150,
            onEnd: function(){
               reOrderChapterValue('#list_chapter li', '#chapters_order');
            }
        });
    });

    function reOrderChapterValue(eleIn, eleOut){
        var valueArray = [];

        $(eleIn).each(function(index){
            var keyId = $(this).attr('data-id');
            valueArray.push({[keyId]:index+1});
        });

        $(eleOut).val(JSON.stringify(valueArray));
    }

</script>
@endsection