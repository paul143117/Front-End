<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;

class CourseController extends Controller
{
    /**
     * Display a listing of all courses.
     */
    public function index()
    {
        $courses = Course::withCount('students')->orderBy('course_code')->get();

        return view('courses.index', compact('courses'));
    }

    /**
     * Display the specified course with enrolled students.
     */
    public function show(Course $course)
    {
        $course->load('students');
        $enrolledIds = $course->students->pluck('id')->toArray();
        $availableStudents = Student::orderBy('last_name')->orderBy('first_name')
            ->whereNotIn('id', $enrolledIds)
            ->get();

        return view('courses.show', compact('course', 'availableStudents'));
    }
}
