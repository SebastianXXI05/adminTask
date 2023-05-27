<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Task extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'month'];

  protected $hidden = ['created_at', 'updated_at'];

  public static function validateData($data) {
    $validator = Validator::make($data, [
			'title' => 'required|min:3|max:50',
			'month' => 'required|integer'
		]);

    if ($validator->fails()) {
			$errors = $validator->errors();

			return response()->json(['error' => $errors], 400);
		}

    return null;
  }
}
