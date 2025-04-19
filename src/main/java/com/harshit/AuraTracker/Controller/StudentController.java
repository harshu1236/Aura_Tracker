package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.StudentService;
import com.harshit.AuraTracker.modal.Student;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RestController
@RequestMapping("/api/std")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public Student createStudent(@RequestBody Student student)
    {
        return studentService.createStudent(student);
    }

    @GetMapping("{id}")
    public Optional<Student> getStudentById(@PathVariable Integer id) throws Exception {
        Optional<Student> studentDataById = studentService.getStudentDataById(id);
        if (studentDataById==null)
            throw new Exception("Student is not registered with is id "+id);
        return studentDataById;
    }

    @GetMapping("/all")
    public List<Student> getAllStudentData()
    {
        return studentService.getAllStudent();
    }


}
