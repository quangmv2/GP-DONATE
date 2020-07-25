<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MessageService;

class MessageController extends Controller
{

    function __construct(MessageService $messageService){
        $this->messageService = $messageService;
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $messages = $this->messageService->getMessages($request->user()->id);
        return response()->json(($messages), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->messageService->validate($request);
        $message = $this->messageService->save($request->user()->id, $request->to, $request->content);
        return response()->json(json_decode($message), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $messagesDetail = $this->messageService->getMessageDetail($request->user()->id, $id);
        return response()->json(($messagesDetail), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
