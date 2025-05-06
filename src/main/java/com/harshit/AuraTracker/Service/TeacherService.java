package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Teacher;

import java.util.List;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher);
    List<Teacher> getAllTeachers();
    Teacher getTeacherById(Long teacherId);
    List<Course> getCoursesByTeacherId(Long teacherId);
    List<Student> getStudentsForTeacher(Long teacherId);
}
