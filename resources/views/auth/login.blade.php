@extends('layouts.blank')

@section('content')
	<!-- Content area -->
	<div class="content d-flex justify-content-center align-items-center">

		<!-- Login form -->
		<form class="login-form" method="POST" action="{{ route('login') }}">
			@csrf
			<div class="card mb-0">
				<div class="card-body">
					<div class="text-center mb-3">
						<i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
						<h5 class="mb-0">Login to your account</h5>
						<span class="d-block text-muted">Enter your credentials below</span>
					</div>

					<div class="form-group form-group-feedback form-group-feedback-left">
						<input id="login" type="text" class="form-control {{ $errors->has('username') || $errors->has('email') ? ' is-invalid' : '' }}" name="login" value="{{ old('username') ?: old('email') }}" required autocomplete="email" autofocus>

                        @if ($errors->has('username') || $errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('username') ?: $errors->first('email') }}</strong>
                            </span>
                        @endif
						<div class="form-control-feedback">
							<i class="icon-user text-muted"></i>
						</div>
					</div>

					<div class="form-group form-group-feedback form-group-feedback-left">
						<input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
						<div class="form-control-feedback">
							<i class="icon-lock2 text-muted"></i>
						</div>
					</div>

					<div class="form-group form-group-feedback form-group-feedback-left">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                            <label class="form-check-label" for="remember">
                                {{ __('Remember Me') }}
                            </label>
                        </div>
                    </div>

					<div class="form-group">
						<button type="submit" class="btn btn-primary btn-block">Sign in <i class="icon-circle-right2 ml-2"></i></button>
					</div>
					@if (Route::has('password.request'))
					<div class="text-center">
						<a href="{{ route('password.request') }}">Forgot password?</a>
					</div>
					@endif
				</div>
			</div>
		</form>
		<!-- /login form -->

	</div>
	<!-- /content area -->

@endsection