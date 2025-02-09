package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findByDayOfWeek(String dayOfWeek);
}
