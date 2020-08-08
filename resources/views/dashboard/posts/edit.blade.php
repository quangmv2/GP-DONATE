@extends('layouts.private')
@section('header_goback')
    <a href="{{ route('posts.index') }}"><i class="icon-arrow-left52 mr-2"></i></a>
@endsection

@section('middle_breadcrumb')
    <a href="{{ route('posts.index') }}" class="breadcrumb-item"> Posts</a>
@endsection

@section('title')
Edit Posts
@endsection

@section('screen_name')
Edit Posts
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


        <form action="{{ route('posts.update',$post->id) }}" method="POST">
        	@csrf
            @method('PUT')
            <div class="row">
                <div class="col-md-9">
                     <div class="row">
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Title:</strong>
                                {{ Form::text('title', $post->title, array('class' => 'form-control', 'placeholder' => 'Name')) }}
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="row">
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
            		            <strong>Hastags:</strong>
                                {{ Form::text('hastags', join(',', $hastags), array('class' => 'form-control', 
                                                    'placeholder' => 'Name', 
                                                    "data-role" => "tagsinput",
                                                    "id" => 'hastags')) }}
                            </div>
                        </div>
                    </div>

                    <div class="row">
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
                                <strong>Offers:</strong>
                                {{-- {{ $post->offers->type_offer }} --}}
                                {{ Form::select('offer', array('' => 'Choose type offer','time' => 'Times', 'goods' => 'Good'), $post->offers?$post->offers->type_offer:'', array('class' => 'form-control')) }}
                            </div>
                        </div>
                    </div>

                    <div class="row">
            		    <div class="col-xs-12 col-sm-12 col-md-12">
            		        <div class="form-group">
                                <strong>Offers:</strong>
                                {{Form::date('due_day',  \Carbon\Carbon::createFromDate($post->due_day) , array('class' => 'form-control'))}} 
                            </div>
                        </div>
                    </div>
                    
                </div>
                

                <div class="col-md-3">
                    <div class="form-group">
                        <strong>Image Feature:</strong>
                        {{ Form::file('photo', array('class' => 'form-control', 'id' => 'photo_thumbnail',
                                                                        "accept"=>"image/png, image/jpeg, image/jpg")) }}

                        {{ Form::text('photo_thumbnail', $post->photo_thumbnail, array('class' => 'form-control hide', 'id' => 'photo')) }}
                        
                        <div id="image_preview">
                            @if($post->photo_thumbnail)
                            <img src="{{'/api/photo?dir='.$post->photo_thumbnail}}" id="preview"/><span class="remove_image icon-cross3 remove" ></span>
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


    $(document).on('change','#photo_thumbnail', function(){
       
        if(imageUrl != ""){
            var imageUrl = $(this).val();
            let form = new FormData();
            var files = $('#photo_thumbnail')[0].files[0];
            if (!files) return;
            form.append('photo', files);
            $.ajax({
                url: '/api/photo/up',
                type: 'post',
                data: form,
                contentType: false,
                processData: false,
                success: function(response){
                    if(response != 0){
                        console.log(response);
                        $('#photo').val(response.image_directory);
                        $('#image_preview').empty();
                        $('#image_preview').html('<img src="'+'/api/photo?dir='+response.image_directory+'" /><span class="remove_image icon-cross3 "></span>');
                    }else{
                        alert('file not uploaded');
                    }
                },
            });
           
        }
    });

    $(document).on('click', '.remove_image', function(e){
        $('#image_preview').empty();
        $('photo_thumbnail').val('');
    });

</script>
@endsection