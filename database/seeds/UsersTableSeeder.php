<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            'email'    => 'admin@example.com',
            'password' => bcrypt('admin123'),
        ]);
    }
}
