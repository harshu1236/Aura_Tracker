package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

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

    

}
