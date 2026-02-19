<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Seeder;

class AcademicPortalSeeder extends Seeder
{
    /**
     * Seed students (Pinoy names), courses, and sample enrollments.
     */
    public function run(): void
    {
        // Pinoy (Filipino) names
        $students = [
            ['student_number' => '2021-001', 'first_name' => 'Juan', 'last_name' => 'Dela Cruz', 'email' => 'juan.delacruz@example.edu.ph'],
            ['student_number' => '2021-002', 'first_name' => 'Maria', 'last_name' => 'Santos', 'email' => 'maria.santos@example.edu.ph'],
            ['student_number' => '2021-003', 'first_name' => 'Pedro', 'last_name' => 'Reyes', 'email' => 'pedro.reyes@example.edu.ph'],
            ['student_number' => '2021-004', 'first_name' => 'Ana', 'last_name' => 'Garcia', 'email' => 'ana.garcia@example.edu.ph'],
            ['student_number' => '2021-005', 'first_name' => 'Miguel', 'last_name' => 'Torres', 'email' => 'miguel.torres@example.edu.ph'],
            ['student_number' => '2021-006', 'first_name' => 'Carmen', 'last_name' => 'Ramos', 'email' => 'carmen.ramos@example.edu.ph'],
        ];

        // Course codes and names from the Course Catalog design
        $courses = [
            ['course_code' => 'IT16_4617', 'course_name' => 'INFORMATION ASSURANCE AND SECURITY 1', 'capacity' => 30],
            ['course_code' => 'IT15_4616', 'course_name' => 'INTEGRATIVE PROGRAMMING AND TECHNOLOGIES', 'capacity' => 25],
            ['course_code' => 'IT20/L_4620', 'course_name' => 'PROFESSIONAL TRACK FOR IT 6', 'capacity' => 20],
            ['course_code' => 'IT17_4945', 'course_name' => 'SOCIAL AND PROFESSIONAL ISSUE', 'capacity' => 35],
            ['course_code' => 'IT18_4611', 'course_name' => 'QUANTITATIVE METHODS', 'capacity' => 28],
            ['course_code' => 'IT17/L_4562', 'course_name' => 'INTRODUCTION TO HUMAN COMPUTER INTERACTION', 'capacity' => 22],
        ];

        foreach ($students as $data) {
            Student::updateOrCreate(
                ['student_number' => $data['student_number']],
                $data
            );
        }

        foreach ($courses as $data) {
            Course::firstOrCreate(
                ['course_code' => $data['course_code']],
                $data
            );
        }

        // Sample enrollments (Pinoy students)
        $juan = Student::where('student_number', '2021-001')->first();
        $maria = Student::where('student_number', '2021-002')->first();
        $pedro = Student::where('student_number', '2021-003')->first();
        $it16 = Course::where('course_code', 'IT16_4617')->first();
        $it15 = Course::where('course_code', 'IT15_4616')->first();
        $it17 = Course::where('course_code', 'IT17_4945')->first();
        $it18 = Course::where('course_code', 'IT18_4611')->first();

        if ($juan && $it16) {
            $juan->courses()->syncWithoutDetaching([$it16->id, $it15->id]);
        }
        if ($maria && $it16) {
            $maria->courses()->syncWithoutDetaching([$it16->id, $it17->id]);
        }
        if ($pedro && $it18) {
            $pedro->courses()->syncWithoutDetaching([$it18->id, $it15->id]);
        }
    }
}
