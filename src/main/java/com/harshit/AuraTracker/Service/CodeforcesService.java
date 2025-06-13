package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.dto.CodeforcesProblem;
import com.harshit.AuraTracker.dto.Submission;

import java.time.LocalDateTime;
import java.util.List;

public interface CodeforcesService {

    CodeforcesProblem getRandomProblem(String tag, int minRating, int maxRating);

    List<Submission> getSubmissions(String handle, LocalDateTime from, LocalDateTime to);

    boolean didSolve(String handle, String contestId, String problemIndex, LocalDateTime from, LocalDateTime to);
}
