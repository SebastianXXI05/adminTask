<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		return response()->json(['success' => true, 'data' => Task::all()]);
	}

	public function show($id) {
		return response()->json(['success' => true, 'data' => Task::find($id)]);
	}

	public function store(Request $request)
	{
		if (Task::validateData($request->all())??false) {
			return Task::validateData($request->all());
		}

		$task = new Task;

		$task->title = $request->title;
		$task->month = $request->month;
		$task->save();

		return response()->json(['success' => true, 'message' => 'A new task was create']);
	}

	public function update(Request $request, $id)
	{
		if (Task::validateData($request->all())??false) {
			return Task::validateData($request->all());
		}

		$task = Task::find($id);
		$task->title = $request->title;
		$task->month = $request->month;
		$task->save();

		return response()->json(['success' => true, 'message' => 'A task was update']);
	}

	public function destroy($id)
	{
		Task::find($id)->delete();

		return response()->json(['success' => true, 'message' => 'A task was delete']);
	}
}
