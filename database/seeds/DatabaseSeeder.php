<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Offer;
use App\Models\Hastag;
use App\Models\Code;
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
        $this->call(CodesTableSeeder::class);

        Hastag::create([
            'name' => 'post'
        ]);

        Hastag::create([
            'name' => 'covid19'
        ]);

        Hastag::create([
            'name' => 'vietnam'
        ]);

        Hastag::create([
            'name' => '2020'
        ]);

        Hastag::create([
            'name' => 'center'
        ]);

        Hastag::create([
            'name' => 'country'
        ]);

        $admin = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
        	'email' => 'admin@gmail.com',
            'password' => bcrypt('123456789'),
            'gender' => 0
        ]);

        $role = Role::where('name','super_admin')->first();
   
        $permissions = Permission::pluck('id','id')->all();
  
        $role->syncPermissions($permissions);
   
        $admin->assignRole([$role->id]);
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
        $taker->assignRole([$role->id]);

        
        try {
            
            DB::transaction(function() use($admin) {
                $code = Code::where('code', 'adminCode')
                    ->where('used', 0)    
                    ->firstOrFail();
                $admin->update([
                    'code_id' => 'adminCode'
                ]);
                $code->update([
                    'used' => 1
                ]);
            });
        } catch (\Throwable $th) {
        }

    }
}
