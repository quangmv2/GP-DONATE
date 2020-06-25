<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Faker\Generator as Faker;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionTableSeeder::class);
        $user = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
        	'email' => 'maiquang1470@gmail.com',
            'password' => bcrypt('123456789'),
            'gender' => 0
        ]);

        $role = Role::where('name','super_admin')->first();
   
        // $permissions = Permission::pluck('id','id')->all();
  
        // $role->syncPermissions($permissions);
   
        $user->assignRole([$role->id]);
        //======================================
        $giver = User::create([
            'first_name' => 'giver',
            'last_name' => '1',
            'username' => 'giver',
        	'email' => 'giver@gmail.com',
            'password' => bcrypt('123456789'),
            'gender' => 0
        ]);

        $role = Role::where('name','giver')->first();
        $giver->assignRole([$role->id]);

        //======================================
        $taker = User::create([
            'first_name' => 'taker',
            'last_name' => '1',
            'username' => 'taker',
        	'email' => 'taker@gmail.com',
            'password' => bcrypt('123456789'),
            'gender' => 0
        ]);

        $role = Role::where('name','taker')->first();
        $giver->assignRole([$role->id]);

    }
}
