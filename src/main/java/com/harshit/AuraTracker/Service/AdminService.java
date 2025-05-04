package com.harshit.AuraTracker.Service;
import com.harshit.AuraTracker.modal.Course;

public interface AdminService {
    Course assignTeacherToCourseByName(String courseName, String teacherName) throws Exception;
}
