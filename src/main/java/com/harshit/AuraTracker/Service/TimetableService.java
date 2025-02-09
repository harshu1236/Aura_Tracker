package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Timetable;

import java.util.List;

public interface TimetableService {
    public List<Timetable> getTimetableByDay(String dayOfWeek);
    public Timetable addTimetableEntry(Timetable timetable);
}
