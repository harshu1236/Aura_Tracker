package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.LeaderboardService;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping
    public List<Student> getLeaderboard() {
        return leaderboardService.getLeaderboard();
    }
}
