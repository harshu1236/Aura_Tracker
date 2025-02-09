package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.TimetableRepository;
import com.harshit.AuraTracker.modal.Timetable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableServiceImpl {

    @Autowired
    private TimetableRepository timetableRepository;

    public List<Timetable> getTimetableByDay(String dayOfWeek) {
        return timetableRepository.findByDayOfWeek(dayOfWeek);
    }

    public Timetable addTimetableEntry(Timetable timetable) {
        return timetableRepository.save(timetable);
    }
}
