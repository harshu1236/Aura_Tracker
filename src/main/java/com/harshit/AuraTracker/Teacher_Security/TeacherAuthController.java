package com.harshit.AuraTracker.Teacher_Security;

import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.Service.TeacherService;
import com.harshit.AuraTracker.Security.JwtTokenProvider;
import com.harshit.AuraTracker.Teacher_Security.AuthResponseForTeacher;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // Signup API
    @PostMapping("/signup")
    public AuthResponseForTeacher signup(@RequestBody Teacher signupRequest) {
        // Check if teacher already exists with this email
        if (teacherRepository.findByEmail(signupRequest.getEmail()) != null) {
            return new AuthResponseForTeacher(null, "Email already exists", null);
        }

        // Encode the password securely
        signupRequest.setPassword(passwordEncoder.encode(signupRequest.getPassword().trim()));

        // Save the teacher in the database
        Teacher savedTeacher = teacherService.createTeacher(signupRequest);

        // Generate the token
        String token = jwtTokenProvider.generateToken(savedTeacher.getEmail());

        // Return response with token, message and teacher details
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
