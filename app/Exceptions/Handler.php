<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            // return response()->json($request->all());
            $str = $request->header('accept');
            $arr = explode(',', $str);
            if (isset($arr[0]) && $arr[0] == "application/json") return response()->json(['message'=>'User have not permission for this page access.']);
            return response()->view('errors.403', ['User have not permission for this page access.'], 403);
            return response()->json(['User have not permission for this page access.'], 403);
        }
        // dd($exception);
        if ($exception instanceof ModelNotFoundException) {
            return response()->json(['message' => 'Not Found Data.'], 404);
        }
        if ($exception instanceof NotFoundHttpException) {
            return response()->json(['message' => 'For Not Found.'], 404);
        }
        if ($exception instanceof MethodNotAllowedHttpException) {
            return response()->json(['message' => 'Method underfine.'], 405);
        }
        return parent::render($request, $exception);
    }
}
