package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.Repository.TeacherRepository;
import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;



import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{

    private static final List<String> VALID_BRANCHES = Arrays.asList("CSE", "ECE", "ME", "CE", "EE", "BIO");
    private static final List<String> VALID_TYPES = Arrays.asList("BTECH", "MASTERS", "PHD");

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

        
        return courseRepo.save(course);
    }

    @Override
    public Course createCourse(Course course) throws Exception {
        validateCourse(course);
        return courseRepo.save(course);
    }

    @Override
    public Course updateCourse(Long courseId, Course courseDetails) throws Exception {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new Exception("Course not found with ID: " + courseId));

        course.setCourseName(courseDetails.getCourseName());
        course.setDescription(courseDetails.getDescription());
        course.setCourseBranch(courseDetails.getCourseBranch());
        course.setCourseType(courseDetails.getCourseType());
        course.setSemester(courseDetails.getSemester());

        validateCourse(course);
        return courseRepo.save(course);
    }

    @Override
    public void deleteCourse(Long courseId) throws Exception {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new Exception("Course not found with ID: " + courseId));
        courseRepo.delete(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    private void validateCourse(Course course) throws Exception {
        String type = course.getCourseType().toUpperCase();
        String branch = course.getCourseBranch().toUpperCase();

        if (!VALID_TYPES.contains(type)) {
            throw new Exception("Invalid course type. Allowed types: " + VALID_TYPES);
        }

        if (!VALID_BRANCHES.contains(branch)) {
            throw new Exception("Invalid course branch. Allowed branches: " + VALID_BRANCHES);
        }

        switch (type) {
            case "BTECH":
                if (course.getSemester() < 1 || course.getSemester() > 8)
                    throw new Exception("BTECH must have semesters between 1 and 8");
                break;
            case "MASTERS":
            case "PHD":
                if (course.getSemester() < 1 || course.getSemester() > 4)
                    throw new Exception(type + " must have semesters between 1 and 4");
                break;
        }
    }
}
