package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Student;
import org.springframework.aop.target.LazyInitTargetSource;

import java.util.List;
import java.util.Optional;


public interface StudentService {


    Student createStudent(Student student);
    Optional<Student> getStudentDataById(Integer id);

    List<Student> getAllStudent();


}
