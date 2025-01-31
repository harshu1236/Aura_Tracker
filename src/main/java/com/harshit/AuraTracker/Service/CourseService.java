package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Course;
import org.springframework.aop.target.LazyInitTargetSource;

import java.util.List;

public interface CourseService {
    public List<Course> getAllCourses();

    public Course createCourse(Course course,int studentId) throws Exception;
}
