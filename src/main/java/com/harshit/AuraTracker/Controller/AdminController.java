package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.AdminService;
import com.harshit.AuraTracker.modal.Course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/assign-teacher")
    public ResponseEntity<Course> assignTeacherByName(
            @RequestParam String courseName,
            @RequestParam String teacherName
    ) throws Exception {
        System.out.println("Course Name: " + courseName);
        System.out.println("Teacher Name: " + teacherName);

        Course updatedCourse = adminService.assignTeacherToCourseByName(courseName, teacherName);
        return ResponseEntity.ok(updatedCourse);
    }
     @PostMapping("/create")
    public Course createCourse(@RequestBody Course course) throws Exception {
        return adminService.createCourse(course);
    }

    @PutMapping("/update/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) throws Exception {
        return adminService.updateCourse(id, course);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCourse(@PathVariable Long id) throws Exception {
        adminService.deleteCourse(id);
        return "Course deleted successfully!";
    }

    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return adminService.getAllCourses();
    }

}
