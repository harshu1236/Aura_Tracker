package com.harshit.AuraTracker.Teacher_Security;

import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.Service.TeacherService;
import com.harshit.AuraTracker.Security.JwtTokenProvider;
import com.harshit.AuraTracker.Teacher_Security.AuthResponseForTeacher;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.harshit.AuraTracker.dto.TeacherSignupRequest;

@RestController
@RequestMapping("/auth/teacher")
@CrossOrigin(origins = "*")
public class TeacherAuthController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CourseRepository courseRepository;;

    // Signup API
    @PostMapping("/signup")
public AuthResponseForTeacher signup(@RequestBody TeacherSignupRequest signupRequest) {
    if (teacherRepository.findByEmail(signupRequest.getEmail()) != null) {
        return new AuthResponseForTeacher(null, "Email already exists", null);
    }

    // Validate course combination
    Optional<Course> courseOpt = courseRepository.findByCourseTypeAndCourseBranchAndSemester(
            signupRequest.getCourseType().trim(),
            signupRequest.getCourseBranch().trim(),
            signupRequest.getSemester());

    if (!courseOpt.isPresent()) {
        return new AuthResponseForTeacher(null, "Invalid course details. Please choose from available options.", null);
    }

    Course course = courseOpt.get();

    Teacher teacher = new Teacher();
    teacher.setName(signupRequest.getName());
    teacher.setEmail(signupRequest.getEmail());
    teacher.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
    teacher.setSemester(signupRequest.getSemester());
    teacher.setCourses(List.of(course));  // link the course

    Teacher savedTeacher = teacherRepository.save(teacher);

    String token = jwtTokenProvider.generateToken(savedTeacher.getEmail());

    return new AuthResponseForTeacher(token, "Signup Successful", savedTeacher);
}


    // Login API
    @PostMapping("/login")
    public AuthResponseForTeacher login(@RequestBody Teacher loginRequest) {
        Teacher existingTeacher = teacherRepository.findByEmail(loginRequest.getEmail());

        if (existingTeacher == null) {
            return new AuthResponseForTeacher(null, "Teacher not found. Please signup first.", null);
        }

        if (!passwordEncoder.matches(loginRequest.getPassword().trim(), existingTeacher.getPassword().trim())) {
            return new AuthResponseForTeacher(null, "Invalid password.", null);
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(existingTeacher.getEmail());

        // Return response with token and teacher details
        return new AuthResponseForTeacher(token, "Login Successful", existingTeacher);
    }
}
