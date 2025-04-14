package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Timetable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TimetableService {
    public List<Timetable> getTimetableByDay(String dayOfWeek);
    public Timetable addTimetableEntry(Timetable timetable);
}
