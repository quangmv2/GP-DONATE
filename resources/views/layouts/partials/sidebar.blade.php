<!-- Main sidebar -->
<div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">

	<!-- Sidebar mobile toggler -->
	<div class="sidebar-mobile-toggler text-center">
		<a href="#" class="sidebar-mobile-main-toggle">
			<i class="icon-arrow-left8"></i>
		</a>
		Navigation
		<a href="#" class="sidebar-mobile-expand">
			<i class="icon-screen-full"></i>
			<i class="icon-screen-normal"></i>
		</a>
	</div>
	<!-- /sidebar mobile toggler -->


	<!-- Sidebar content -->
	<div class="sidebar-content">

		<!-- User menu -->
		<div class="sidebar-user">
			<div class="card-body">
				<div class="media">
					<div class="mr-3">
						<a href="#"><img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="38" height="38" class="rounded-circle" alt=""></a>
					</div>

					<div class="media-body">
						<div class="media-title font-weight-semibold">Victoria Baker</div>
						<div class="font-size-xs opacity-50">
							<i class="icon-pin font-size-sm"></i> &nbsp;Santa Ana, CA
						</div>
					</div>

					<div class="ml-3 align-self-center">
						<a href="#" class="text-white"><i class="icon-cog3"></i></a>
					</div>
				</div>
			</div>
		</div>
		<!-- /user menu -->


		<!-- Main navigation -->
		<div class="card card-sidebar-mobile">
			<ul class="nav nav-sidebar" data-nav-type="accordion">

				<!-- Main -->
				<!-- <li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Main</div> <i class="icon-menu" title="Main"></i></li> -->
				<li class="nav-item">
					<a href="{{route('adminHome')}}" class="nav-link">
						<i class="icon-home4"></i>
						<span>
							Dashboard
							<span class="d-block font-weight-normal opacity-50">No active orders</span>
						</span>
					</a>
				</li>

				<li class="nav-item nav-item-submenu @if (\Request::is('admin/posts') || \Request::is('admin/posts/*') || \Request::is('admin/categories') || \Request::is('admin/categories/*')) nav-item-open @endif">
					<a href="#" class="nav-link"><i class="icon-copy"></i> <span>Posts</span></a>
					<ul class="nav nav-group-sub" data-submenu-title="Layouts" style="@if (\Request::is('admin/posts') || \Request::is('admin/posts/*') || \Request::is('admin/categories') || \Request::is('admin/categories/*')) display:block @endif">
						<li class="nav-item"><a href="{{ route('posts.index') }}" class="nav-link @if(\Request::is('posts')) active @endif">List Posts</a></li>
						<li class="nav-item"><a href="{{ route('posts.create') }}" class="nav-link @if(\Request::is('posts/create')) active @endif">Create Post</a></li>
					</ul>

				</li>
				<li class="nav-item nav-item-submenu @if (\Request::is('admin/users') || \Request::is('admin/users/*')) nav-item-open @endif">
					<a href="#" class="nav-link"><i class="icon-copy"></i> <span>Users</span></a>

					<ul class="nav nav-group-sub" data-submenu-title="Layouts" style="@if (\Request::is('admin/users') || \Request::is('admin/users/*')) display:block @endif">
						<li class="nav-item"><a href="{{ route('users.index') }}" class="nav-link @if(\Request::is('admin/users')) active @endif">List User</a></li>
						<li class="nav-item"><a href="{{ route('users.create') }}" class="nav-link @if(\Request::is('admin/users/create')) active @endif">Create User</a></li>
					</ul>
				</li>
				<li class="nav-item nav-item-submenu @if (\Request::is('admin/roles') || \Request::is('admin/roles/*')) nav-item-open @endif">
					<a href="#" class="nav-link"><i class="icon-copy"></i> <span>Roles</span></a>

					<ul class="nav nav-group-sub" data-submenu-title="Layouts" style="@if (\Request::is('admin/roles') || \Request::is('admin/roles/*')) display:block @endif">
						<li class="nav-item"><a href="{{ route('roles.index') }}" class="nav-link @if(\Request::is('admin/roles')) active @endif">List Role</a></li>
						@can('role-create')
							<li class="nav-item"><a href="{{ route('roles.create') }}" class="nav-link @if(\Request::is('admin/roles/create')) active @endif">Create Role</a></li>
						@endcan
					</ul>
				</li>

				
				
				<!-- /page kits -->

			</ul>
		</div>
		<!-- /main navigation -->

	</div>
	<!-- /sidebar content -->
	
</div>
<!-- /main sidebar -->