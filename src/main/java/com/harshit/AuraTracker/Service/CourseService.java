package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Course;
import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    Course createCourse(Course course, int studentId) throws Exception;
    List<Course> getCoursebyStudentId(int studentId) throws Exception;
    List<Course> getCoursesByCourseTypeAndBranchAndSemester(String courseName, String courseBranch, int semester);
}
