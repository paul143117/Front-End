<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{
    protected $fillable = [
        'course_code',
        'course_name',
        'capacity',
    ];

    protected $casts = [
        'capacity' => 'integer',
    ];

    /**
     * The students enrolled in this course.
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'enrollments')
            ->withTimestamps();
    }

    /**
     * Get the number of enrolled students.
     */
    public function getEnrolledCountAttribute(): int
    {
        return $this->students()->count();
    }

    /**
     * Check if the course has available slots.
     */
    public function hasAvailableSlots(): bool
    {
        return $this->enrolled_count < $this->capacity;
    }
}
