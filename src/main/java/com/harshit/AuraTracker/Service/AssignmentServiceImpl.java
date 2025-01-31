package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.AssignmentRepository;
import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService{

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    CourseRepository courseRepository;

    @Override
    public List<Assignment> getAllAssignment() {
        List<Assignment> assignments = assignmentRepository.findAll();
        return assignments;
    }

    @Override
    public Assignment createAssignment(Assignment assignment,Long courseId) throws Exception {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isPresent())
        {
            Course course1=course.get();
            assignment.setCourses(course1);
            return assignmentRepository.save(assignment);
        }
        else {
            throw new Exception("course not found with id "+courseId);
        }
    }
}
