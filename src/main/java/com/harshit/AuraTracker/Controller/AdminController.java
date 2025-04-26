package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.AdminService;
import com.harshit.AuraTracker.modal.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
}
