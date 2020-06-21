<?php


namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Category;
use App\Models\Post;
use App\Models\Menu;
use App\Models\Module;
use App\Models\Event;
use Illuminate\Http\Request;
use DB;
use Response;
use App\Services\CommonService;


class PageController extends Controller
{ 
    /**
     * @SWG\Get(
     *     path="/api/pages-settings",
     *     tags={"Pages"},
     *     summary={"Pages Settings"},
     *     description="Return all pages in settings",
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *     	   @SWG\Schema(type="object",
     *         		@SWG\Property(property="data", type="object"),
     *     		)
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function listPage(Request $request)
    {
        $constPage = constants('page');
        $idPages = array_column($constPage, 'id');
        $pages = Page::whereIn('name', $idPages)->get();

        if($pages){
            foreach ($pages as $key => $page) {

                if(isset($page->content)){

                    if($page->name == "home"){
                        $page->content = "/api/home";
                    }else{
                        $page->content = json_decode($page->content);
                        if(count($page->content) > 0){
                            $content = $page->content;
                            foreach ($content as $subkey => $section) {
                                //if have children in section
                                if(isset($section->children) && count($section->children) > 0){
                                    $content[$subkey]->type = "";
                                    $content[$subkey]->type_select = "";
                                    $content[$subkey]->includes = "";
                                    $content[$subkey]->ispanel = true;

                                    foreach ($section->children as $tabkey => $tab) {
                                        $section->children[$tabkey]->api = getApiSection($section->children[$tabkey]);
                                    }
                                }else{
                                    $content[$subkey]->api = getApiSection($content[$subkey]);
                                }
                            }
                            $page->content = $content;
                        }

                    
                    }
                    $pages[$key]->content = $page->content;
                }
            }
        }
        $data = CommonService::filterArray($pages);

        return Response::json([
            'data' => $data,
        ]);
    }


    
    public function pageDetail($name){
    	$data = [];
        $page = Page::where('name', $name)->first();
        
        if($page && isset($page->content)) {

        	if($page->content){
        		$sections = json_decode($page->content);
        		$sections = (array) $sections;
        		foreach ($sections as $key => $section) {
        			if($section->type == "book" || $section->type == "post" || $section->type == "audio"){
        				$query = Post::where('post_type', $section->type)->where('status', 1);

        				if($section->type_select == 'latest'){
        					$query = $query->latest('created_at')->take(10);
        				}else{
        					$ids = explode(",", $section->includes);
        					$query = $query->whereIn('id', $ids);
        				}

        				$sections[$key]->data = $query->select('id', 'title', 'author', 'slug', 'description', 'feature_image')->get();
        			}

        			if($section->type == 'menu') {
        				if($section->type_select == 'latest'){
        					$query = Menu::latest('created_at')->take(1);
        				}else{
        					$ids = explode(",", $section->includes);
        					$query = Menu::where('id', $ids[0]);
        				}
        				$menuResult = $query->first();
        				if($menuResult){
        					$menuResult->content = json_decode($menuResult->content);
        				}
        				$sections[$key]->data = $menuResult;
        			}

        			if($section->type == 'slider') {
        				if($section->type_select == 'latest'){
        					$query = Module::where('type', 'quoteslider')
        							->where('status', 1)
        							->latest('created_at')->take(1);
        				}else{
        					$ids = explode(",", $section->includes);
        					$query = Module::where('id', $ids[0])->where('status', 1);
        				}
        				$sections[$key]->data = $query->with('quotes')->get();
        			}
        		}

        		$data = $sections;
        		$data = CommonService::filterArray($data);
        	}
        	

        }
        return Response::json([
            'data' => $data ? $data : [],
        ]);
    }

    /**
     * @SWG\Get(
     *     path="/api/data",
     *     tags={"Pages"},
     *     summary={"Pages Settings Data"},
     *     description="Return detail page setting data by query",  
     *     @SWG\Parameter(
     *         name="type",
     *         in="query",
     *         type="string",
     *         description="Length of record need to response",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="type_select",
     *         in="query",
     *         type="string",
     *         description="Example: latest or features or ",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="includes",
     *         in="query",
     *         type="string",
     *         description="Example: 1,2,3,4",
     *         required=false,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *              @SWG\Property(property="data", type="object"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function getData(Request $request){
        $type = $request->input('type');
        $type_select = $request->input('type_select');
        $includes = $request->input('includes');

        if(!$type || $type == ""){
            return Response::json([
                'data' => []
            ]);
        }

        $data = [];

        if($type == "book" ||$type == "post" || $type == "audio" || $type == "event"){

            if($type == "event"){
                $query = Event::where('status', 1);
            }else{
                $query = Post::where('post_type', $type)->where('status', 1)->with("categories");
            }

            if($type_select == 'latest'){
                $query = $query->latest('created_at')->take(10);
            }else if($type_select == 'features'){
                $query = $query->orderBy('created_at', 'DESC')->orderBy('view_number', 'DESC')->take(10);
            }else if($type != "event" && $type_select == 'categories'){
                $catids = explode(",", $includes);
                $query = $query->whereHas('categories', function($q) use($catids) {
                    $q->whereIn('categories.id', $catids);
                })->orderBy('created_at', 'DESC')->take(10);
            }else{
                $ids = explode(",", $includes);
                $query = $query->whereIn('id', $ids);
            }
            $data = $query->get();
        }

        else if($type == 'menu') {
            if($type_select == 'latest' || $type_select == 'features'){
                $query = Menu::latest('created_at')->take(1);
            }else{
                $ids = explode(",", $includes);
                $query = Menu::where('id', $ids[0]);
            }
            $menuResult = $query->first();
            if($menuResult){
                $menuResult->content = json_decode($menuResult->content);
            }
            $data = $menuResult;
        }

        else if($type == 'slider') {
            if($type_select == 'latest' || $type_select == 'features'){
                $query = Module::where('type', 'quoteslider')
                        ->where('status', 1)
                        ->latest('created_at')->take(1);
            }else{
                $ids = explode(",", $includes);
                $query = Module::where('id', $ids[0])->where('status', 1);
            }
            $data = $query->with('quotes')->get();
        }

        return Response::json([
            'data' => $data
        ]);
    }

    /**
     * @SWG\Get(
     *     path="/api/home",
     *     tags={"Pages"},
     *     summary={"Pages Home Settings"},
     *     description="Return home page settings",
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *              @SWG\Property(property="data", type="object"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function  home(Request $request){
        $data = [];
        $page = Page::where('name', "home")->first();
        
        if($page && isset($page->content)) {

            if($page->content){
                $sections = json_decode($page->content);
                $sections = (array) $sections;
                foreach ($sections as $key => $section) {
                    if($section->type == "book" || $section->type == "post" || $section->type == "audio"){
                        $query = Post::where('post_type', $section->type)->where('status', 1);

                        if($section->type_select == 'latest'){
                            $query = $query->latest('created_at')->take(10);
                        }else{
                            $ids = explode(",", $section->includes);
                            $query = $query->whereIn('id', $ids);
                        }

                        $sections[$key]->data = $query->select('id', 'title', 'author', 'slug', 'description', 'feature_image')->get();
                    }

                    if($section->type == 'menu') {
                        if($section->type_select == 'latest'){
                            $query = Menu::latest('created_at')->take(1);
                        }else{
                            $ids = explode(",", $section->includes);

                            $query = Menu::where('id', $ids[0]);
                        }
                        $menuResult = $query->first();
                        if($menuResult){
                            $menuResult->content = json_decode($menuResult->content);
                        }
                        $sections[$key]->data = $menuResult ? $menuResult->content : null;
                    }

                    if($section->type == 'slider') {
                        if($section->type_select == 'latest'){
                            $query = Module::where('type', 'quoteslider')
                                    ->where('status', 1)
                                    ->latest('created_at')->take(1);
                        }else{
                            $ids = explode(",", $section->includes);
                            $query = Module::where('id', $ids[0])->where('status', 1);
                        }
                        $sections[$key]->data = $query->with('quotes')->get();
                    }
                }

                $data = $sections;
                $data = CommonService::filterArray($data);
            }
            $page->content = $data;
        }
        return Response::json([
            //'page' => $page,
            'data' => $page ? $page : [],
        ]);
    }
}