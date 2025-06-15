package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.modal.Compete;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.Service.CompeteService;
import com.harshit.AuraTracker.Service.StudentService;
import com.harshit.AuraTracker.dto.DuelRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/duels")
public class DuelController {

    @Autowired
    private CompeteService competeService;

    @Autowired
    private StudentService studentService;

    // Start a new 1v1 duel

    @PostMapping("/start")
    public Compete startDuel(@RequestBody DuelRequest duelRequest) {
    Student challenger = studentService.getStudentById(duelRequest.getChallengerId());
    Student opponent = studentService.getStudentById(duelRequest.getOpponentId());
        System.out.println(challenger.getRegNo());
        System.out.println(opponent.getRegNo());
    return competeService.startDuel(challenger, opponent, duelRequest.getDuration());
}


    // Manually end a duel and determine the winner
    @PostMapping("/end/{duelId}")
    public Compete endDuel(@PathVariable Long duelId) {
        return competeService.endDuel(duelId);
    }

    // Get all duels (ongoing + completed) for a given student
    @GetMapping("/student/{studentId}")
    public List<Compete> getDuelsForStudent(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId);
        return competeService.getDuelsForStudent(student);
    }

    // Get all ongoing duels
    @GetMapping("/ongoing")
    public List<Compete> getOngoingDuels() {
        return competeService.getOngoingDuels();
    }

    // Get all completed duels
    @GetMapping("/completed")
    public List<Compete> getCompletedDuels() {
        return competeService.getCompletedDuels();
    }
}
