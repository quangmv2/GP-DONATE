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
        // $this->call(UsersTableSeeder::class);
        $user = User::create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
        	'email' => 'maiquang1470@gmail.com',
            'password' => bcrypt('123456789'),
            'gender' => 'male'
        ]);

        $role = Role::where('name','super_admin')->first();
   
        $permissions = Permission::pluck('id','id')->all();
  
        $role->syncPermissions($permissions);
   
        $user->assignRole([$role->id]);
        //======================================
        // $faker = Faker\Factory::create();
        // foreach (range(1,1000) as $index) {
        //     DB::table('users')->insert([
        //         'name' => $faker->name,
        //         'username' => $faker->name,
        //         'email' => $faker->email,
        //         'password' => bcrypt('secret'),
        //     ]);
        // }

        //======================================
        // $user = User::where('id', 1)->first();
        // $faker = Faker\Factory::create();
        // foreach (range(1,200) as $index) {
        //     DB::table('posts')->insert([
        //         'user_id' => $user->id,
        //         'title' => $faker->name,
        //         'slug' => $faker->name,
        //         'description' => $faker->name,
        //         'content' => $faker->name,
        //         'status' => 1
        //     ]);
        // }
    }
}
