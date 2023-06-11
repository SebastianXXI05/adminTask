<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

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
		$task->description = $request->description;
		$task->done = $request->done;
		$task->save();

		return response()->json(['success' => true, 'message' => 'A new task was create'], 201);
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

	// view tasks doned or not doned
	public function view(Request $request) {
		/* $request->doned = $request->doned == 1 ? true : false;

		if ($request->doned) {
			return response()->json(['data' => Task::where('done', '=', true)->get()]);
		}

		return response()->json(['data' => Task::where('done', '=', false)->get()]); */
		// return response()->json(['data' => $request->doned]);
		return $request->doned == 1 ? 
			response()->json(['data' => Task::where('done', '=', true)->get()])
			:
			response()->json(['data' => Task::where('done', '=', false)->get()]);
	}

	// search by the task title
	public function searchByTitle(Request $request) {
		$title = $request->title;
		$tasks = Task::where('title', 'LIKE', $title.'%')->get();

		return response()->json(['data' => $tasks]);
	}
}
