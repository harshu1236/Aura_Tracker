package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    CourseService courseService;

   

    // ✅ New Endpoint: Get Course by courseName, courseBranch, and semester
    // @GetMapping("/find")
    // public List<Course> getCourseByNameBranchSemester(
    //         @RequestParam String courseName,
    //         @RequestParam String courseBranch,
    //         @RequestParam int semester
    // ) {
    //     return courseService.getCoursesByCourseTypeAndBranchAndSemester(courseName, courseBranch, semester);
    // }
}
