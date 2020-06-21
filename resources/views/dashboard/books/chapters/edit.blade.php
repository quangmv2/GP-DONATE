@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('books.edit', $book->id) }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('books.index') }}" class="breadcrumb-item"> Books</a>
    <a href="{{ route('books.edit', $book->id) }}" class="breadcrumb-item"> Book {{$book->title}}</a>
@endsection

@section('screen_name')
Edit Chapter
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


        <form action="{{ route('books-chapter.update',$chapter->id) }}" method="POST">
        	@csrf
            @method('PUT')
            {{ Form::hidden('parent_id', $book->id, array('class' => 'form-control hide', 'id' => 'parent_id')) }}
            <div class="row">
                <div class="col-md-9">
                     <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Original Book:</strong> <a href="{{url('/')}}/books/{{$book->id}}/edit" target="_blank">{{$book->title}}</a>
                            </div>
                        </div>
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Title:</strong>
                                {{ Form::text('title', $chapter->title, array('class' => 'form-control', 'placeholder' => 'Name')) }}
            		        </div>
            		    </div>
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Description:</strong>
                                {!! Form::textarea('description', $chapter->description, ['id' => 'description', 'class' => 'form-control','placeholder' => 'Description', 'style' => 'height:150px']) !!}
            		        </div>
            		    </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Content:</strong>
                                {!! Form::textarea('content', $chapter->content, ['id' => 'content', 'class' => 'form-control content-editor','placeholder' => 'Content']) !!}
                            </div>
                        </div>

            		</div>
                </div>

                <div class="col-md-3">

                    <div class="form-group">
                        <strong>Image Feature:</strong>
                        <button type="button" class="btn btn-primary btn_feature_image" style="">Browse Server</button>
                        {{ Form::hidden('feature_image', $chapter->feature_image, array('class' => 'form-control hide', 'id' => 'feature_image')) }}
                        <div id="image_preview">
                            @if($chapter->feature_image || old('feature_image'))
                            <img src="{{old('feature_image') ? old('feature_image') : $chapter->feature_image}}" /><span class="remove_image icon-cross3 remove" ></span>
                            @endif
                        </div>
                    </div>

                </div>

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
        $('feature_image').val('');
    });

</script>
@endsection