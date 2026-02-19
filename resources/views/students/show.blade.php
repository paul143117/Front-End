@extends('layouts.app')

@section('title', $student->full_name)

@section('content')
<div style="margin-bottom: 1.5rem;">
    <a href="{{ route('students.index') }}" style="font-size: 0.875rem; color: #4b5563; text-decoration: none;" onmouseover="this.style.color='#2563eb'" onmouseout="this.style.color='#4b5563'">&larr; Back to students</a>
</div>

<div class="portal-card">
    <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
        <h1 style="font-size: 1.5rem; font-weight: 700; color: #111; margin: 0;">{{ $student->full_name }}</h1>
        <dl style="margin: 0.75rem 0 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div>
                <dt style="font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; margin: 0;">Student number</dt>
                <dd style="font-size: 0.875rem; color: #111; margin: 0.125rem 0 0 0;">{{ $student->student_number }}</dd>
            </div>
            <div>
                <dt style="font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; margin: 0;">Email</dt>
                <dd style="font-size: 0.875rem; color: #111; margin: 0.125rem 0 0 0;">{{ $student->email }}</dd>
            </div>
        </dl>
    </div>
    <div style="padding: 1.25rem 1.5rem;">
        <h2 style="font-size: 1.125rem; font-weight: 600; color: #111; margin: 0 0 0.75rem 0;">Enrolled courses</h2>
        @if ($student->courses->isEmpty())
            <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">This student is not enrolled in any courses.</p>
        @else
            <ul style="margin: 0; padding: 0; list-style: none; border-top: 1px solid #e5e7eb;">
                @foreach ($student->courses as $course)
                    <li style="padding: 0.75rem 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e7eb;">
                        <div>
                            <span style="font-weight: 500; color: #111;">{{ $course->course_name }}</span>
                            <span style="color: #6b7280; font-size: 0.875rem; margin-left: 0.5rem;">({{ $course->course_code }})</span>
                        </div>
                        <a href="{{ route('courses.show', $course) }}" class="link-blue" style="font-size: 0.875rem;">View course</a>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
</div>
@endsection
