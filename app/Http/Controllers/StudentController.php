<?php

namespace App\Http\Controllers;

use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Display a listing of all students.
     */
    public function index()
    {
        $students = Student::withCount('courses')->orderBy('last_name')->orderBy('first_name')->get();

        return view('students.index', compact('students'));
    }

    /**
     * Display the specified student profile with enrolled courses.
     */
    public function show(Student $student)
    {
        $student->load('courses');

        return view('students.show', compact('student'));
    }
}
