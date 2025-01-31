package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.AssignmentService;
import com.harshit.AuraTracker.Service.CourseService;
import com.harshit.AuraTracker.modal.Assignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {


    @Autowired
    AssignmentService assignmentService;



    @GetMapping("/all")
    public List<Assignment> getAssignmentData()
    {
        return assignmentService.getAllAssignment();
    }

    @PostMapping("/save/{courseId}")
    public Assignment createAssignmentData(@RequestBody Assignment assignment,@PathVariable Long courseId) throws Exception {
        Assignment assignment1 = assignmentService.createAssignment(assignment, courseId);
        return assignment1;
    }

}
