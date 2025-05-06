package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Repository.AssignmentRepository;
import com.harshit.AuraTracker.Repository.AssignmentSubmissionRepository;
import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.Service.StudentService;
import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.AssignmentSubmission;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
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
    private AssignmentSubmissionRepository submissionRepo;
    
    @Autowired
    private StudentRepository studentRepository;

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
    @PostMapping("/assignments/{assignmentId}/submit")
    public AssignmentSubmission submitAssignment(
            @PathVariable Long assignmentId,
            @RequestParam("studentId") Long studentId,
            @RequestParam("file") MultipartFile file) throws Exception {
        
        Assignment assignment = assignmentRepo.findById(assignmentId)
                .orElseThrow(() -> new Exception("Assignment not found"));

        Student student = studentRepository.findById(studentId.intValue())
                .orElseThrow(() -> new Exception("Student not found"));

        // Ensure the directory exists: Aura_Tracker/submissions
        String uploadDir = System.getProperty("user.dir") + File.separator + "Aura_Tracker" + File.separator + "submissions";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Save file to submissions folder
        String filePath = uploadDir + File.separator + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // Save metadata to database (if needed)
        AssignmentSubmission submission = new AssignmentSubmission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setSubmittedFileUrl(filePath);

        return submissionRepo.save(submission);
    }

    // Endpoint to download a student's submission for an assignment
    @GetMapping("/assignments/{assignmentId}/submission")
    public InputStreamResource downloadMySubmission(
            @PathVariable Long assignmentId,
            @RequestHeader("Authorization") String authHeader) throws Exception {

        // Extract studentId from JWT token
        String token = authHeader.replace("Bearer ", "");
        Integer studentId = studentService.extractStudentIdFromToken(token);

        AssignmentSubmission submission = submissionRepo
                .findByAssignment_IdAndStudent_StudentId(assignmentId, studentId.longValue())
                .orElseThrow(() -> new Exception("Submission not found"));

        File file = new File(submission.getSubmittedFileUrl());
        if (!file.exists()) {
            throw new FileNotFoundException("File not found");
        }

        return new InputStreamResource(new FileInputStream(file));
    }

    @GetMapping("/{id}/courses")
    public List<Course> getCoursesByStudentId(@PathVariable Long id) {
        return studentService.getCoursesByStudentId(id);
    }

    @GetMapping("/{studentId}/teachers")
    public List<Teacher> getTeachersForStudent(@PathVariable Integer studentId) {
        return studentService.getTeachersForStudent(studentId);
    }

}
