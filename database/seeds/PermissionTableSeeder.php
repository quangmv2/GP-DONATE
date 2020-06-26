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
                'guard_name' => 'Super Admin'
            ],
            [
                'name' => 'contributor',
                'guard_name' => 'Contributor'
            ],
            [
                'name' => 'giver',
                'guard_name' => 'Giver'
            ],
            [
                'name' => 'taker',
                'guard_name' => 'Taker'
            ],
        ];

        foreach ($roles as $key => $role) {
            Role::create(['name' => $role["name"], 'show_name' => $role["guard_name"]]);
        }
        
        $permissions = [
           'role-list',
           'role-create',
           'role-edit',
           'role-delete',
           'post-list',
           'post-create',
           'post-edit',
           'post-delete',
           'post-review',
           'user-add',
           'user-edit',
           'user-list',
        ];

        $role = Role::findByName('super_admin');

        foreach ($permissions as $permission) {
             $permiss = Permission::create(['name' => $permission]);
             $role->givePermissionTo($permiss);
        }
        
    }
}
