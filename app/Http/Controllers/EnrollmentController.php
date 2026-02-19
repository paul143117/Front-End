<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EnrollmentController extends Controller
{
    /**
     * Enroll a student in a course.
     * Prevents duplicate enrollments and respects course capacity.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'course_id'  => ['required', 'exists:courses,id'],
        ]);

        $student = Student::findOrFail($validated['student_id']);
        $course = Course::withCount('students')->findOrFail($validated['course_id']);

        if ($student->courses()->where('course_id', $course->id)->exists()) {
            throw ValidationException::withMessages([
                'course_id' => ['This student is already enrolled in this course.'],
            ]);
        }

        if ($course->students_count >= $course->capacity) {
            throw ValidationException::withMessages([
                'course_id' => ['This course has reached its capacity.'],
            ]);
        }

        $student->courses()->attach($course->id);

        return back()->with('success', "Successfully enrolled {$student->full_name} in {$course->course_name}.");
    }

    /**
     * Remove a student from a course.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'course_id'  => ['required', 'exists:courses,id'],
        ]);

        $student = Student::findOrFail($validated['student_id']);
        $course = Course::findOrFail($validated['course_id']);

        $student->courses()->detach($course->id);

        return back()->with('success', "Successfully dropped {$student->full_name} from {$course->course_name}.");
    }
}
