<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $roles = [
            [
                'name' => 'super_admin',
                'show_name' => 'Super Admin'
            ],
            [
                'name' => 'contributor',
                'show_name' => 'Contributor'
            ],
            [
                'name' => 'giver',
                'show_name' => 'Giver'
            ],
            [
                'name' => 'taker',
                'show_name' => 'Taker'
            ],
        ];

        foreach ($roles as $key => $role) {
            Role::create(['name' => $role["name"], 'show_name' => $role["show_name"]]);
        }

        $permissions = [
            [
                'name' => 'admin-page',
                'show_name' => 'Access Admin Page'
            ],
            [
                'name' => 'role-list',
                'show_name' => 'List Role'
            ],
            [
                'name' => 'role-create',
                'show_name' => 'Create Role'
            ],
            [
                'name' => 'role-edit',
                'show_name' => 'Edit Role'
            ],
            [
                'name' => 'role-delete',
                'show_name' => 'Edit Role'
            ],
            [
                'name' => 'post-list',
                'show_name' => 'List Post'
            ],
            [
                'name' => 'post-list-all',
                'show_name' => 'List All Post'
            ],
            [
                'name' => 'post-create',
                'show_name' => 'Create Post'
            ],
            [
                'name' => 'post-edit',
                'show_name' => 'Edit Post'
            ],
            [
                'name' => 'post-edit-all',
                'show_name' => 'Edit All Post'
            ],
            [
                'name' => 'post-delete',
                'show_name' => 'Delete Post'
            ],
            [
                'name' => 'post-delete-all',
                'show_name' => 'Delete All Post'
            ],
            [
                'name' => 'user-create',
                'show_name' => 'Create User'
            ],
            [
                'name' => 'user-edit',
                'show_name' => 'Edit User'
            ],
            [
                'name' => 'user-edit-all',
                'show_name' => 'Edit All User'
            ],
            [
                'name' => 'user-list-all',
                'show_name' => 'List All User'
            ],
            [
                'name' => 'user-delete-all',
                'show_name' => 'Delele All User'
            ],
            [
                'name' => 'hastag-create',
                'show_name' => 'Create Hastag'
            ],
            [
                'name' => 'code-create',
                'show_name' => 'Create Code Invitation'
            ],
            [
                'name' => 'code-edit',
                'show_name' => 'Edit Code Invitation'
            ],
            [
                'name' => 'code-delete',
                'show_name' => 'Delete Code Invitation'
            ],
            [
                'name' => 'code-send',
                'show_name' => 'Send Code Invitation'
            ],
            [
                'name' => 'like-post',
                'show_name' => 'Like Post'
            ],
            [
                'name' => 'comment-post',
                'show_name' => 'Comment Post'
            ],
        ];

        $role = Role::findByName('super_admin');

        foreach ($permissions as $permission) {
             $permiss = Permission::create(['name' => $permission['name'], 'show_name' => $permission['show_name']]);
             $role->givePermissionTo($permiss);
        }
        
    }
}
