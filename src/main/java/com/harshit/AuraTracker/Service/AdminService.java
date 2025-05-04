package com.harshit.AuraTracker.Service;
import java.util.List;

import com.harshit.AuraTracker.modal.Course;

public interface AdminService {
    Course assignTeacherToCourseByName(String courseName, String teacherName) throws Exception;

    Course createCourse(Course course) throws Exception;

    Course updateCourse(Long courseId, Course courseDetails) throws Exception;

    void deleteCourse(Long courseId) throws Exception;

    List<Course> getAllCourses();

}
