@extends('layouts.app')

@section('title', 'Home')

@section('content')
<div style="text-align: center; padding: 3rem 1rem;">
    <h1 style="font-size: 1.875rem; font-weight: 700; color: #111; margin: 0 0 0.5rem 0;">Academic Portal</h1>
    <p style="font-size: 1rem; color: #4b5563; margin: 0 0 2rem 0;">Manage students, courses, and enrollments.</p>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
        <a href="{{ route('students.index') }}" class="btn-red">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Students
        </a>
        <a href="{{ route('courses.index') }}" class="btn-gray">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            Courses
        </a>
    </div>
</div>
@endsection
