<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Academic Portal') - {{ config('app.name') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif; margin: 0; }
        /* Critical layout so design always shows even if Tailwind is slow or blocked */
        .portal-header { background-color: #dc2626; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .portal-header-inner { max-width: 72rem; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; align-items: center; height: 4rem; }
        .portal-brand { display: block; text-decoration: none; }
        .portal-brand h1 { font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0; }
        .portal-brand p { font-size: 0.875rem; color: rgba(255,255,255,0.9); margin: 0.125rem 0 0 0; }
        .portal-nav { display: flex; align-items: center; gap: 0.25rem; }
        .portal-nav a { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 0.25rem; font-size: 0.875rem; font-weight: 500; text-decoration: none; color: #fff; transition: background 0.15s; }
        .portal-nav a:hover { background: rgba(255,255,255,0.1); }
        .portal-nav a.active { background: #b91c1c; color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .portal-divider { height: 1px; width: 100%; background: #d1d5db; }
        .portal-main { max-width: 72rem; margin: 0 auto; padding: 2rem 1rem; }
        .portal-card { background: #fff; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; overflow: hidden; }
        .portal-card-header { background: #dc2626; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .portal-card-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0; }
        .portal-card-desc { font-size: 0.875rem; color: rgba(255,255,255,0.9); margin: 0.25rem 0 0 0; }
        .btn-red { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; background: #dc2626; color: #fff; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .btn-red:hover { background: #b91c1c; }
        .btn-gray { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; background: #e5e7eb; color: #111; font-size: 0.875rem; font-weight: 500; border-radius: 0.5rem; text-decoration: none; }
        .btn-gray:hover { background: #d1d5db; }
        table.portal-table { width: 100%; border-collapse: collapse; }
        table.portal-table th { text-align: left; padding: 0.75rem 1.5rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #dc2626; background: #f9fafb; }
        table.portal-table td { padding: 1rem 1.5rem; font-size: 0.875rem; color: #374151; border-top: 1px solid #e5e7eb; }
        table.portal-table tr:hover td { background: #f9fafb; }
        .link-blue { color: #2563eb; text-decoration: none; }
        .link-blue:hover { text-decoration: underline; }
    </style>
</head>
<body style="background: #f3f4f6; min-height: 100vh; color: #111;">
    <header class="portal-header">
        <div class="portal-header-inner">
            <a href="{{ route('home') }}" class="portal-brand">
                <h1>Academic Portal</h1>
                <p>Course & Enrollment System</p>
            </a>
            <nav class="portal-nav">
                <a href="{{ route('students.index') }}" class="{{ request()->routeIs('students.*') ? 'active' : '' }}">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Students
                </a>
                <a href="{{ route('courses.index') }}" class="{{ request()->routeIs('courses.*') ? 'active' : '' }}">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    Courses
                </a>
            </nav>
        </div>
        <div class="portal-divider"></div>
    </header>

    <main class="portal-main">
        @if (session('success'))
            <div style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; border-radius: 0.5rem; font-size: 0.875rem;">
                {{ session('success') }}
            </div>
        @endif
        @if ($errors->any())
            <div style="margin-bottom: 1rem; padding: 0.75rem 1rem; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; border-radius: 0.5rem; font-size: 0.875rem;">
                <ul style="margin: 0; padding-left: 1.25rem;">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @yield('content')
    </main>
</body>
</html>
