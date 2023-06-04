<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Task extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'month', 'description', 'done'];

  protected $hidden = ['created_at', 'updated_at'];

  protected $casts = [
    'done' => 'boolean'
  ];

  public static function validateData($data) {
    $validator = Validator::make($data, [
			'title' => 'required|min:3|max:50',
			'month' => 'required|integer',
      'description' => 'min:3|max:500'
		]);

    if ($validator->fails()) {
			$errors = $validator->errors();

			return response()->json(['success' => false, 'error' => $errors], 400);
		}

    return null;
  }
}
