package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Repository.AssignmentRepository;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.Repository.StudentSubmissionRepository;
import com.harshit.AuraTracker.Service.StudentService;
import com.harshit.AuraTracker.modal.Assignment;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.StudentSubmission;
import com.harshit.AuraTracker.modal.Teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RestController
@RequestMapping("/api/std")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AssignmentRepository assignmentRepo;

   
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentSubmissionRepository studentSubmissionRepo;

    // Endpoint to create a new student
    @PostMapping("/add")
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    // Endpoint to fetch student by ID
    @GetMapping("{id}")
    public Optional<Student> getStudentById(@PathVariable Integer id) throws Exception {
        Optional<Student> studentDataById = studentService.getStudentDataById(id);
        if (!studentDataById.isPresent()) {
            throw new Exception("Student is not registered with ID " + id);
        }
        return studentDataById;
    }

    // Endpoint to fetch all students
    @GetMapping("/all")
    public List<Student> getAllStudentData() {
        return studentService.getAllStudent();
    }

    // Endpoint to submit an assignment
    

    // Endpoint to download a student's submission for an assignment
    

    @GetMapping("/{id}/courses")
    public List<Course> getCoursesByStudentId(@PathVariable Long id) {
        return studentService.getCoursesByStudentId(id);
    }

    @GetMapping("/{studentId}/teachers")
    public List<Teacher> getTeachersForStudent(@PathVariable Integer studentId) {
        return studentService.getTeachersForStudent(studentId);
    }


    @GetMapping("/{studentId}/courses/{courseId}/assignments")
public ResponseEntity<?> getAssignmentsForCourse(
        @PathVariable Long studentId,
        @PathVariable Long courseId) {

    Student student = studentRepository.findByStudentId(studentId).orElseThrow();
    boolean enrolled = student.getCourses().stream().anyMatch(c -> c.getCourseId().equals(courseId));
    if (!enrolled) return ResponseEntity.status(403).body("You are not enrolled in this course.");

    List<Assignment> assignments = assignmentRepo.findByCourses_CourseId(courseId);
    return ResponseEntity.ok(assignments);
}


    @GetMapping("/assignment-file")
public ResponseEntity<?> downloadAssignment(@RequestParam String fileUrl) throws FileNotFoundException {
    File file = new File(fileUrl);
    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
    return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=" + file.getName())
            .body(resource);
}

    @Value("${file.submission-dir}")
private String submissionDir;

@PostMapping("/{studentId}/assignments/{assignmentId}/submit")
public ResponseEntity<?> submitAssignment(
        @PathVariable Long studentId,
        @PathVariable Long assignmentId,
        @RequestParam("file") MultipartFile file) {

    try {
        Student student = studentRepository.findByStudentId(studentId).orElseThrow();
        Assignment assignment = assignmentRepo.findById(assignmentId).orElseThrow();

        // Check enrollment
        boolean enrolled = student.getCourses().stream()
                .anyMatch(c -> c.getCourseId().equals(assignment.getCourses().getCourseId()));
        if (!enrolled) {
            return ResponseEntity.status(403).body("Not enrolled in this course.");
        }

        // Ensure directory exists
        Path dirPath = Paths.get(submissionDir);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        // Create file path
        String filename = file.getOriginalFilename();
        Path filePath = dirPath.resolve(filename);

        // Save file
        file.transferTo(filePath.toFile());

        // Create submission entry
        StudentSubmission submission = new StudentSubmission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setFileUrl(filePath.toString()); // Save absolute or relative path
        submission.setSubmissionDate(LocalDate.now());

        studentSubmissionRepo.save(submission);

        return ResponseEntity.ok("Submitted successfully.");

    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("File upload failed.");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Submission failed.");
    }
}



}
