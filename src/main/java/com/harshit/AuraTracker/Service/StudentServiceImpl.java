package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Student;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {

        Student saved = studentRepository.save(student);
        System.out.println("saved student "+saved.getStudentId());
        System.out.println("saved student "+saved.getStudent_Name());
        System.out.println("saved student "+saved.getCourses());
        System.out.println("saved student "+saved.getPassword());
        System.out.println("saved student "+saved.getRegNo());
        return saved;
    }

    @Override
    public Optional<Student> getStudentDataById(Integer studentId) {
        if (studentRepository.findById(studentId).isPresent())
        {
            return studentRepository.findById(studentId);
        }
        return null;
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
