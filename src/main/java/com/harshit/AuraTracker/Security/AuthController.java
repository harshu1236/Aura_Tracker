package com.harshit.AuraTracker.Security;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.dto.AuthResponse;
import com.harshit.AuraTracker.dto.LoginRequest;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Change PasswordEncoder to BCryptPasswordEncoder
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<Student> studentOpt = studentRepository.findByRegNo(loginRequest.getRegNo());

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            // Debugging the stored hashed password and entered password
            System.out.println("User Found: " + student.getRegNo());
            System.out.println("Password Found: " + student.getPassword());
            System.out.println("hashed password: " + loginRequest.getPassword());
            // Password comparison using passwordEncoder (BCryptPasswordEncoder)
            if (passwordEncoder.matches(loginRequest.getPassword().trim(), student.getPassword().trim())) {
                System.out.println("SUCESSFULL");
                String token = jwtUtil.generateToken(student.getRegNo());
                return new AuthResponse(token, "Login Successful", student);
            } else {
                System.out.println("Password Mismatch!");  // Debugging mismatch
            }
        } else {
            System.out.println("User Not Found!");  // Debugging if user is not found
        }

        return new AuthResponse(null, "Invalid Credentials", null);
    }

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody Student student) {
        if (studentRepository.findByRegNo(student.getRegNo()).isPresent()) {
            return new AuthResponse(null, "Registration Number already exists", null);
        }
        System.out.println("Running signup");

        student.setPassword(passwordEncoder.encode(student.getPassword())); // Hash the password with BCrypt
        Student savedStudent = studentRepository.save(student);
        String token = jwtUtil.generateToken(savedStudent.getRegNo());

        return new AuthResponse(token, "Signup Successful", savedStudent);
    }
}
