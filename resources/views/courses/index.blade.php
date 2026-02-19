@extends('layouts.app')

@section('title', 'Course Catalog')

@section('content')
<div class="portal-card">
    <div class="portal-card-header">
        <div>
            <h1 class="portal-card-title">Course Catalog</h1>
            <p class="portal-card-desc">Browse and manage all available courses in the system.</p>
        </div>
        <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.9)" viewBox="0 0 24 24" style="flex-shrink: 0;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
    </div>
    <div style="overflow-x: auto;">
        <table class="portal-table">
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Capacity</th>
                    <th>Enrollment</th>
                    <th style="text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($courses as $course)
                    @php
                        $enrolled = $course->students_count;
                        $capacity = $course->capacity;
                        $pct = $capacity > 0 ? min(100, round(($enrolled / $capacity) * 100)) : 0;
                        $isFull = $enrolled >= $capacity;
                    @endphp
                    <tr>
                        <td><a href="{{ route('courses.show', $course) }}" class="link-blue">{{ $course->course_code }}</a></td>
                        <td>{{ $course->course_name }}</td>
                        <td>{{ $capacity }} students</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="min-width: 80px;">
                                    <div style="height: 6px; background: #e5e7eb; border-radius: 9999px; overflow: hidden;">
                                        <div style="height: 100%; width: {{ $pct }}%; background: #dc2626; border-radius: 9999px;"></div>
                                    </div>
                                    <span style="font-size: 0.75rem; color: #6b7280;">{{ $enrolled }}/{{ $capacity }}</span>
                                </div>
                                @if ($isFull)
                                    <span style="display: inline-block; padding: 0.125rem 0.5rem; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; background: #fef3c7; color: #92400e;">Full</span>
                                @else
                                    <span style="display: inline-block; padding: 0.125rem 0.5rem; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; background: #dcfce7; color: #166534;">Available</span>
                                @endif
                            </div>
                        </td>
                        <td style="text-align: right;">
                            <a href="{{ route('courses.show', $course) }}" class="btn-red">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                View Details
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" style="text-align: center; padding: 2.5rem; color: #6b7280;">No courses found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
