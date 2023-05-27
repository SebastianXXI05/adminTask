<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::resource('task', TaskController::class)->only('store', 'index', 'update', 'destroy');