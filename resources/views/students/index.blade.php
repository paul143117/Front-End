@extends('layouts.app')

@section('title', 'Student Directory')

@section('content')
<div class="portal-card">
    <div class="portal-card-header">
        <div>
            <h1 class="portal-card-title">Student Directory</h1>
            <p class="portal-card-desc">View and manage all registered students.</p>
        </div>
        <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.9)" viewBox="0 0 24 24" style="flex-shrink: 0;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
    </div>
    <div style="overflow-x: auto;">
        <table class="portal-table">
            <thead>
                <tr>
                    <th>Student #</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrollment</th>
                    <th style="text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($students as $student)
                    <tr>
                        <td><a href="{{ route('students.show', $student) }}" class="link-blue">{{ $student->student_number }}</a></td>
                        <td>{{ $student->full_name }}</td>
                        <td>{{ $student->email }}</td>
                        <td>{{ $student->courses_count }} course(s)</td>
                        <td style="text-align: right;">
                            <a href="{{ route('students.show', $student) }}" class="btn-red">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                View Profile
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" style="text-align: center; padding: 2.5rem; color: #6b7280;">No students found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
