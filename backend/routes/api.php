<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::resource('task', TaskController::class)->only('store', 'index', 'update', 'destroy', 'show');

Route::post('task/view', [TaskController::class, 'view']);