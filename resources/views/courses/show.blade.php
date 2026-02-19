@extends('layouts.app')

@section('title', $course->course_name)

@section('content')
<div style="margin-bottom: 1.5rem;">
    <a href="{{ route('courses.index') }}" style="font-size: 0.875rem; color: #4b5563; text-decoration: none;" onmouseover="this.style.color='#2563eb'" onmouseout="this.style.color='#4b5563'">&larr; Back to courses</a>
</div>

<div class="portal-card">
    <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
        <h1 style="font-size: 1.5rem; font-weight: 700; color: #111; margin: 0;">{{ $course->course_name }}</h1>
        <dl style="margin: 0.75rem 0 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div>
                <dt style="font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; margin: 0;">Course code</dt>
                <dd style="font-size: 0.875rem; color: #111; margin: 0.125rem 0 0 0;">{{ $course->course_code }}</dd>
            </div>
            <div>
                <dt style="font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; margin: 0;">Capacity</dt>
                <dd style="font-size: 0.875rem; color: #111; margin: 0.125rem 0 0 0;">{{ $course->students->count() }} / {{ $course->capacity }} enrolled</dd>
            </div>
        </dl>
    </div>

    <div style="padding: 1.25rem 1.5rem;">
        <h2 style="font-size: 1.125rem; font-weight: 600; color: #111; margin: 0 0 0.75rem 0;">Enrolled students</h2>
        @if ($course->students->isEmpty())
            <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">No students enrolled in this course.</p>
        @else
            <ul style="margin: 0; padding: 0; list-style: none; border-top: 1px solid #e5e7eb;">
                @foreach ($course->students as $student)
                    <li style="padding: 0.75rem 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e7eb;">
                        <div>
                            <span style="font-weight: 500; color: #111;">{{ $student->full_name }}</span>
                            <span style="color: #6b7280; font-size: 0.875rem; margin-left: 0.5rem;">({{ $student->student_number }})</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <a href="{{ route('students.show', $student) }}" class="link-blue" style="font-size: 0.875rem;">View profile</a>
                            <form action="{{ route('enrollments.destroy') }}" method="POST" style="display: inline;" onsubmit="return confirm('Drop this student from the course?');">
                                @csrf
                                @method('DELETE')
                                <input type="hidden" name="student_id" value="{{ $student->id }}">
                                <input type="hidden" name="course_id" value="{{ $course->id }}">
                                <button type="submit" style="font-size: 0.875rem; color: #dc2626; background: none; border: none; cursor: pointer; text-decoration: none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Drop</button>
                            </form>
                        </div>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>

    @if ($course->students->count() < $course->capacity && $availableStudents->isNotEmpty())
        <div style="padding: 1.25rem 1.5rem; border-top: 1px solid #e5e7eb; background: #f9fafb;">
            <h3 style="font-size: 0.875rem; font-weight: 600; color: #111; margin: 0 0 0.75rem 0;">Enroll a student</h3>
            <form action="{{ route('enrollments.store') }}" method="POST" style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 0.75rem;">
                @csrf
                <input type="hidden" name="course_id" value="{{ $course->id }}">
                <div style="min-width: 200px;">
                    <label for="student_id" style="display: block; font-size: 0.75rem; font-weight: 500; color: #6b7280; margin-bottom: 0.25rem;">Student</label>
                    <select name="student_id" id="student_id" required style="display: block; width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem;">
                        <option value="">Select a student</option>
                        @foreach ($availableStudents as $s)
                            <option value="{{ $s->id }}">{{ $s->full_name }} ({{ $s->student_number }})</option>
                        @endforeach
                    </select>
                </div>
                <button type="submit" class="btn-red">Enroll</button>
            </form>
        </div>
    @endif
</div>
@endsection
