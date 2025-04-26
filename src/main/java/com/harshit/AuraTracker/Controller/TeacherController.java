package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Repository.AssignmentRepository;
import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Service.TeacherService;
import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/{teacherId}/courses")
    public List<Course> getCourses(@PathVariable Long teacherId) {
        return courseRepo.findByTeacher_TeacherId(teacherId);
    }

    @PostMapping("/{courseId}/assignments")
    public Assignment addAssignment(
            @PathVariable Long courseId,
            @RequestBody Assignment assignment
    ) throws Exception {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new Exception("Course not found"));
        assignment.setCourses(course);
        return assignmentRepo.save(assignment);
    }

    @PostMapping("/create")
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping("/all")
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

}
