package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Student.CourseType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {

        // Make sure to set default values if needed
        if (student.getStudentCourse() == null) {
            student.setStudentCourse("Unknown Course");
        }
        if (student.getSemester() == 0) {
            student.setSemester(1);  // Default semester
        }
        if (student.getCourseType() == null) {
            student.setCourseType(CourseType.BTECH);  // Default course type
        }

        // Save the student object and return the saved instance
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> getStudentDataById(Integer studentId) {
        return studentRepository.findById(studentId);
    }

    @Override
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    @Override
    public Integer extractStudentIdFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey("9Dkfl8h38@Vns93!nfi38cnQ94fnV3mcnA47vNfi29@cnvXfi93vMCn39vncXfi") // Replace with your secret
            .parseClaimsJws(token)
            .getBody();

        return Integer.parseInt(claims.get("studentId").toString());
    }
}
