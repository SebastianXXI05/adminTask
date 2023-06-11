<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('task/search', [TaskController::class, 'searchByTitle']);
Route::get('task/view', [TaskController::class, 'view']);

Route::resource('task', TaskController::class)->only('store', 'index', 'update', 'destroy', 'show');