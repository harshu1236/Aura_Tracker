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
    public List<Course> getAllCoursesData() {
        return courseService.getAllCourses();
    }

    @PostMapping("/save/{studentId}")
    public Course createCourseData(@RequestBody Course course, @PathVariable int studentId) throws Exception {
        Course savedCourse = courseService.createCourse(course, studentId);
        return savedCourse;
    }

    @GetMapping("/student/{studentId}")
    public List<Course> getCoursesByStudent(@PathVariable int studentId) throws Exception {
        return courseService.getCoursebyStudentId(studentId);
    }

    // ✅ New Endpoint: Get Course by courseName, courseBranch, and semester
    @GetMapping("/find")
    public List<Course> getCourseByNameBranchSemester(
            @RequestParam String courseName,
            @RequestParam String courseBranch,
            @RequestParam int semester
    ) {
        return courseService.getCoursesByCourseTypeAndBranchAndSemester(courseName, courseBranch, semester);
    }
}
