package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.TimetableService;
import com.harshit.AuraTracker.modal.Timetable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @GetMapping("/{dayOfWeek}")
    public List<Timetable> getTimetable(@PathVariable String dayOfWeek) {
        return timetableService.getTimetableByDay(dayOfWeek);
    }

    @PostMapping
    public Timetable addTimetableEntry(@RequestBody Timetable timetable) {
        return timetableService.addTimetableEntry(timetable);
    }
}
