package com.harshit.AuraTracker.Controller;



import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.modal.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/available-course-options")
public ResponseEntity<List<Map<String, Object>>> getAvailableCourseOptions() {
    List<Course> courses = courseRepository.findAll();

    List<Map<String, Object>> result = new ArrayList<>();
    for (Course c : courses) {
        Map<String, Object> item = new HashMap<>();
        item.put("type", c.getCourseType());
        item.put("branch", c.getCourseBranch());
        item.put("semester", c.getSemester());
        result.add(item);
    }

    return ResponseEntity.ok(result);
}

}

