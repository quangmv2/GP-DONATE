<?php 

if ( ! function_exists('constants'))
{
    function constants($key)
    {
       return config('constants.' . $key);
    }
}

if ( ! function_exists('printMenu'))
{
    function printMenu($arrayMenu)
    {
       if(count($arrayMenu) > 0){
       	foreach ($arrayMenu as $key => $menu) {

       		?>
       		<li class="list-group-item" data-id="<?php echo $menu->id; ?>" data-name="<?php echo $menu->name; ?>" data-url="<?php echo $menu->url; ?>" data-image="<?php echo $menu->feature_image; ?>">
	            <div class="dd-handle">
	                <span class="item-name"><?php echo $menu->name; ?></span>
	                <span>
	                    <button type="button" class="btn btn-small btn-edit item" draggable="false">Edit</button>
	                    <button type="button" class="btn btn-small btn-remove item" draggable="false">Delete</button>
	                </span>
	            </div>
	            <?php 
	            	if(count($menu->children) > 0){
		       			?>
		       			<ol>
		       			<?php
		       				printMenu($menu->children);
		       			?>
		       			</ol>
		       			<?php
		       		}
	            ?>
	        </li>
       		<?php
       	}
       }
    }
}

if ( ! function_exists('printSection'))
{
    function printSection($arraySection)
    {
       if(count($arraySection) > 0){
       	foreach ($arraySection as $key => $section) {
       		//var_dump($section);
       		?>
       		<li class="list-group-item" data-id="<?php echo $section->id; ?>" data-name="<?php echo $section->name; ?>" data-type="<?php echo $section->type; ?>" data-type-select="<?php echo $section->type_select; ?>" data-includes="<?php echo $section->includes; ?>" data-image="<?php echo isset($section->feature_image) ? $section->feature_image : ''; ?>">
	            <div class="dd-handle">
	                <span class="item-name"><?php echo $section->name; ?></span>
	                <span>
	                    <button type="button" class="btn btn-small btn-edit item" draggable="false">Edit</button>
	                    <button type="button" class="btn btn-small btn-remove item" draggable="false">Delete</button>
	                </span>
	            </div>
	            <?php 
	            	if(isset($section->children)){
		       			?>
		       			<ol>
		       			<?php
		       				printSection($section->children);
		       			?>
		       			</ol>
		       			<?php
		       		}
	            ?>
	        </li>
       		<?php
       	}
       }
    }
}

if(! function_exists('getApiSection')) {
	function getApiSection($section) {
		$url = "";
		if($section) {
			$url = "/api/data?";

			$url .= "type=".$section->type;
			$url .= "&type_select=".$section->type_select;
			if($section->type_select != "latest" && $section->type_select != "features"){
				$url .= "&includes=".$section->includes;
			}
			
		}
		
		return $url;
	}
}