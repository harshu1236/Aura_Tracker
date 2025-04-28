package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Repository.AssignmentRepository;
import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Service.TeacherService;
import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/{teacherId}")
    public Teacher getTeacherById(@PathVariable Long teacherId) {
        return teacherService.getTeacherById(teacherId);
    }

    @GetMapping("/{teacherId}/assignments")
public List<Assignment> getAssignmentsForTeacher(@PathVariable Long teacherId) {
    List<Course> courses = courseRepo.findByTeacher_TeacherId(teacherId);
    List<Assignment> allAssignments = new ArrayList<>();

    for (Course course : courses) {
        allAssignments.addAll(assignmentRepo.findByCourses(course));
    }

    return allAssignments;
}

@DeleteMapping("/assignments/{assignmentId}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Long assignmentId) throws Exception {
        Assignment assignment = assignmentRepo.findById(assignmentId)
                .orElseThrow(() -> new Exception("Assignment not found with id: " + assignmentId));
        assignmentRepo.delete(assignment);
        return ResponseEntity.ok("Assignment deleted successfully.");
    }

    @PutMapping("/assignments/{assignmentId}")
    public ResponseEntity<Assignment> updateAssignment(
            @PathVariable Long assignmentId,
            @RequestBody Assignment updatedAssignment
    ) throws Exception {
        Assignment assignment = assignmentRepo.findById(assignmentId)
                .orElseThrow(() -> new Exception("Assignment not found with id: " + assignmentId));

        assignment.setTitle(updatedAssignment.getTitle());
        assignment.setDueDate(updatedAssignment.getDueDate());

        Assignment savedAssignment = assignmentRepo.save(assignment);
        return ResponseEntity.ok(savedAssignment);
    }


}
