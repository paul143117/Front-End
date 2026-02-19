<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->ensureDatabaseExists();
    }

    /**
     * Create the application database in MySQL if it does not exist (e.g. for Laragon).
     */
    private function ensureDatabaseExists(): void
    {
        if (config('database.default') !== 'mysql') {
            return;
        }

        $database = config('database.connections.mysql.database');
        if (empty($database)) {
            return;
        }

        try {
            DB::connection('mysql_system')->statement(
                "CREATE DATABASE IF NOT EXISTS `" . str_replace('`', '``', $database) . "`"
            );
        } catch (\Throwable $e) {
            // Ignore (e.g. wrong credentials or MySQL not running)
        }
    }
}
