package com.harshit.AuraTracker.Security;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.dto.AuthResponse;
import com.harshit.AuraTracker.dto.LoginRequest;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<Student> student = studentRepository.findByReg_No(loginRequest.getReg_No());

        if (student.isPresent() && student.get().getPassword().equals(loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(student.get().getReg_No());
            return new AuthResponse(token, "Login Successful");
        } else {
            return new AuthResponse(null, "Invalid Credentials");
        }
    }

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody Student student) {
        if (studentRepository.findByReg_No(student.getReg_No()).isPresent()) {
            return new AuthResponse(null, "Registration Number already exists");
        }

        studentRepository.save(student);
        String token = jwtUtil.generateToken(student.getReg_No());
        return new AuthResponse(token, "Signup Successful");
    }
}
