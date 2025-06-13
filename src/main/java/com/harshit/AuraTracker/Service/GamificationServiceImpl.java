package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GamificationServiceImpl implements GamificationService{

    @Autowired
    private StudentRepository studentRepository;

    public Student addPoints(Long studentId, int points) throws Exception {
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent()) {
            Student st = student.get();
            st.setPoints(st.getPoints() + points);
            return studentRepository.save(st);
        } else {
            throw new Exception("Student not found");
        }
    }
}
