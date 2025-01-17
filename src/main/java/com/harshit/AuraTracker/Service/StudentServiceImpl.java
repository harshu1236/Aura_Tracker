package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {

        Student saved = studentRepository.save(student);
        System.out.println("saved student "+saved.getStudent_Id());
        System.out.println("saved student "+saved.getStudent_Name());
        System.out.println("saved student "+saved.getCourse());
        System.out.println("saved student "+saved.getPassword());
        System.out.println("saved student "+saved.getReg_No());
        return saved;
    }

    @Override
    public Optional<Student> getStudentDataById(Integer id) {
        if (studentRepository.findById(id).isPresent())
        {
            return studentRepository.findById(id);
        }
        return null;
    }
}
