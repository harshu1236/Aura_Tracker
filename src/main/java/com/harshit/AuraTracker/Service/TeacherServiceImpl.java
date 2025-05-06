package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacherById(Long teacherId) {
        return teacherRepository.findById(teacherId).orElse(null);
    }

    @Override
    public List<Course> getCoursesByTeacherId(Long teacherId) {
        return teacherRepository.findCoursesByTeacherId(teacherId);
    }

    @Override
    public List<Student> getStudentsForTeacher(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

        List<Long> courseIds = teacher.getCourses()
                .stream()
                .map(Course::getCourseId)
                .collect(Collectors.toList());

        return studentRepository.findStudentsByCourseIds(courseIds);
    }

    

}
