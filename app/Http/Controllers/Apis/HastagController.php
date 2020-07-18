<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Hastag;

class HastagController extends Controller
{

    /**
     * @SWG\Get(
     *     path="api/hastag",
     *     tags={"Hastag"},
     *     summary={"Search hastag"},
     *     description="Search hastag",
     *     @SWG\Parameter(
     *         name="q",
     *         in="query",
     *         type="string",
     *         description="Key word",
     *         required=false,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *     	   @SWG\Schema(type="array",
     *          @SWG\Items(
     *              @SWG\Property(property="id", type="number", example=1),
     *              @SWG\Property(property="value", type="number", example="covid19"),
    *               @SWG\Property(property="created_at", type="string"),
    *               @SWG\Property(property="updated_at", type="string"),
    *             ),
     *     		),
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $hastags = Hastag::where('value', 'like', '%'.$search.'%')->get();
        return response()->json(
            json_decode($hastags),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
