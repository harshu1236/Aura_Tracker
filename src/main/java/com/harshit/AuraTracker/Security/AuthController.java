package com.harshit.AuraTracker.Security;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.dto.AuthResponse;
import com.harshit.AuraTracker.dto.LoginRequest;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

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
    public AuthResponse signup(@RequestBody Student signupRequest) {
        if (studentRepository.findByRegNo(signupRequest.getRegNo()).isPresent()) {
            return new AuthResponse(null, "Registration Number already exists", null);
        }
        // encode the password
        signupRequest.setPassword(passwordEncoder.encode(signupRequest.getPassword().trim()));
        Student saved = studentRepository.save(signupRequest);
        String token = jwtTokenProvider.generateToken(saved.getRegNo());
        return new AuthResponse(token, "Signup Successful", saved);
    }
}
