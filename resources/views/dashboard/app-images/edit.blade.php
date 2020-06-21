@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('app-images.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('app-images.index') }}" class="breadcrumb-item"> Images</a>
@endsection

@section('screen_name')
Edit Image
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


        <form action="{{ route('app-images.update',$image->id) }}" method="POST">
        	@csrf
            @method('PUT')
            <div class="row">
                <div class="col-md-12">
                     <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Title:</strong>
                                {!! Form::text('title', $image->title, ['id' => 'title', 'class' => 'form-control','placeholder' => 'Title']) !!}
                                
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Description:</strong>
                                {{ Form::textarea('description', $image->description, array('class' => 'form-control', 'placeholder' => 'Description')) }}
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Image Feature:</strong>
                                <button type="button" class="btn btn-primary btn_feature_image" style="">Browse Server</button>
                                {{ Form::hidden('feature_image', $image->feature_image, array('class' => 'form-control hide', 'id' => 'feature_image')) }}
                                <div id="image_preview">
                                    @if($image->feature_image || old('feature_image'))
                                    <img src="{{old('feature_image') ? old('feature_image') : $image->feature_image}}" /><span class="remove_image icon-cross3 remove" ></span>
                                    @endif
                                </div>
                            </div>
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