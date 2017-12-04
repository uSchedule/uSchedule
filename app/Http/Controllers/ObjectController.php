<?php

namespace App\Http\Controllers;

use App\Object;
use Illuminate\Http\Request;

class ObjectController extends Controller
{
    /**
     * Get list of subjects
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list(Request $request)
    {
        // TODO: Temporary
        return response()->json(Object::where('name', 'like', '%' . $request->search . '%')->get());
    }

    /**
     * Get one subject
     *
     * @param  Request $request
     */
    public function one(Request $request)
    {
        // TODO: Implement one() method.
    }

    /**
     * Create new subject
     *
     * @param Request $request
     */
    public function create(Request $request)
    {
        // TODO: Implement create() method.
    }

    /**
     * Update existing subject by id
     *
     * @param Request $request
     */
    public function update(Request $request)
    {
        // TODO: Implement update() method.
    }

    /**
     * Delete subject by id
     *
     * @param  Request $request
     */
    public function delete(Request $request)
    {
        // TODO: Implement delete() method.
    }
}