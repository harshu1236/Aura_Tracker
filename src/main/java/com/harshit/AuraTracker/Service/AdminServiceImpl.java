package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private TeacherRepository teacherRepo;


    @Override
    public Course assignTeacherToCourseByName(String courseName, String teacherName) throws Exception {
        Course course = courseRepo.findByCourseName(courseName)
                .orElseThrow(() -> new Exception("Course not found with name: " + courseName));

        Teacher teacher = teacherRepo.findByName(teacherName)
                .orElseThrow(() -> new Exception("Teacher not found with name: " + teacherName));

        course.setTeacher(teacher);
        return courseRepo.save(course);
    }
}
