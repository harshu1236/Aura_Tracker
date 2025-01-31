package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    StudentRepository studentRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course createCourse(Course course,int studentId) throws Exception {
        System.out.println(studentId);
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent())
        {
            Student student1=student.get();
            course.setStudent(student1);
            return courseRepository.save(course);
        }
        else {
            throw new Exception("Student not found with id "+studentId);
        }
    }
}
