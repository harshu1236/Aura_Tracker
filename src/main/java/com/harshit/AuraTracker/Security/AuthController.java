package com.harshit.AuraTracker.Security;



import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.dto.AuthResponse;
import com.harshit.AuraTracker.dto.LoginRequest;
import com.harshit.AuraTracker.dto.StudentSignupRequest;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<Student> studentOpt = studentRepository.findByRegNo(loginRequest.getRegNo());
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword().trim(), student.getPassword().trim())) {
                String token = jwtTokenProvider.generateToken(student.getRegNo());
                return new AuthResponse(token, "Login Successful", student);
            }
        }
        return new AuthResponse(null, "Invalid Credentials", null);
    }

    @PostMapping("/signup")
public AuthResponse signup(@RequestBody StudentSignupRequest signupRequest) {
    if (studentRepository.findByRegNo(signupRequest.getRegNo()).isPresent()) {
        return new AuthResponse(null, "Registration Number already exists", null);
    }

    Optional<Course> courseOpt = courseRepository.findByCourseTypeAndCourseBranchAndSemester(
        signupRequest.getCourseType().trim(),
        signupRequest.getCourseBranch().trim(),
        signupRequest.getSemester());


        System.out.println("Received values: " +
        signupRequest.getCourseType() + ", " +
        signupRequest.getCourseBranch() + ", " +
        signupRequest.getSemester());
    
    if (!courseOpt.isPresent()) {
        return new AuthResponse(null, "Invalid course details. Please choose from available options.", null);
    }

    Course course = courseOpt.get();

    Student student = new Student();
    student.setStudentName(signupRequest.getStudentName());
    student.setRegNo(signupRequest.getRegNo());
    student.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
    student.setSemester(signupRequest.getSemester());
    student.setRole("STUDENT");
    student.setCourses(List.of(course));  // link the course

    studentRepository.save(student);

    String token = jwtTokenProvider.generateToken(student.getRegNo());
    return new AuthResponse(token, "Signup Successful", student);
}

}
