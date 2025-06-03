package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Repository.AssignmentRepository;
import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.StudentSubmissionRepository;
import com.harshit.AuraTracker.Service.TeacherService;
import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.StudentSubmission;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.http.HttpHeaders;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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

    @Autowired
    private StudentSubmissionRepository studentSubmissionRepo;

    // @GetMapping("/{teacherId}/courses")
    // public List<Course> getCourses(@PathVariable Long teacherId) {
    //     return courseRepo.findByTeacher_TeacherId(teacherId);
    // }

    

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






    

    @GetMapping("/courses/{courseId}/assignments")
    public List<Assignment> getAssignmentsByCourse(@PathVariable Long courseId) {
        return assignmentRepo.findByCourses_CourseId(courseId);
    }


    @GetMapping("/{id}/courses")
    public List<Course> getCoursesByTeacherId(@PathVariable Long id) {
        return teacherService.getCoursesByTeacherId(id);
    }

    @GetMapping("/{teacherId}/students")
    public List<Student> getStudentsByTeacher(@PathVariable Long teacherId) {
        return teacherService.getStudentsForTeacher(teacherId);
    }


    @Value("${file.upload-dir}")
    private String uploadDir;

@PostMapping("/{teacherId}/courses/{courseId}/assignments")
public ResponseEntity<?> uploadAssignment(
        @PathVariable Long teacherId,
        @PathVariable Long courseId,
        @RequestParam("title") String title,
        @RequestParam("dueDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDate,
        @RequestParam("file") MultipartFile file) {

    try {
        // Check if teacher teaches the course
        Teacher teacher = teacherService.getTeacherById(teacherId);
        boolean teachesCourse = teacher.getCourses().stream().anyMatch(c -> c.getCourseId().equals(courseId));
        if (!teachesCourse) {
            return ResponseEntity.status(403).body("You don't teach this course.");
        }

        // Ensure the upload directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file
        String filename = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        file.transferTo(filePath.toFile());

        // Create and save assignment
        Assignment assignment = new Assignment();
        assignment.setTitle(title);
        assignment.setDueDate(dueDate);
        assignment.setFileUrl(filePath.toString()); // Save full path or relative URL
        assignment.setCourses(courseRepo.findById(courseId).orElseThrow());

        assignmentRepo.save(assignment);

        return ResponseEntity.ok("Assignment uploaded.");
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed.");
    } catch (Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
    }
}


    @GetMapping("/assignments/{assignmentId}/submissions")
public ResponseEntity<?> getSubmissionsForAssignment(@PathVariable Long assignmentId) {
    List<StudentSubmission> submissions = studentSubmissionRepo.findByAssignment_Id(assignmentId);
    return ResponseEntity.ok(submissions);
}


@GetMapping("/download-submission")
public ResponseEntity<?> downloadStudentSubmission(@RequestParam String fileUrl) {
    try {
        File file = new File(fileUrl);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found.");
        }

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    } catch (FileNotFoundException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File not found.");
    }
}




}
