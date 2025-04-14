package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.CourseService;
import com.harshit.AuraTracker.modal.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/all")
    public List<Course> getAllCoursesData()
    {
        return courseService.getAllCourses();
    }

    @PostMapping("/save/{studentId}")
    public Course createCourseData(@RequestBody Course course,@PathVariable int studentId) throws Exception {
        Course course1 = courseService.createCourse(course, studentId);
        System.out.println(course1.getId());
        System.out.println(course1.getCourseName());
        System.out.println(course1.getDescription());
        System.out.println(course1.getStudent());
        return course1;
    }

}
