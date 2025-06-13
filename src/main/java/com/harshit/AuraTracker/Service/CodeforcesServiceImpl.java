package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CodeforcesServiceImpl implements CodeforcesService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public CodeforcesProblem getRandomProblem(String tag, int minRating, int maxRating) {
        String url = "https://codeforces.com/api/problemset.problems";

        var response = restTemplate.getForObject(url, ProblemsetResponse.class);
        List<CodeforcesProblem> problems = response.getResult().getProblems();

        List<CodeforcesProblem> filtered = problems.stream()
                .filter(p -> p.getRating() != null
                        && p.getRating() >= minRating
                        && p.getRating() <= maxRating
                        && (tag == null || p.getTags().contains(tag)))
                .collect(Collectors.toList());

        Collections.shuffle(filtered);
        return filtered.get(0);
    }

    @Override
    public List<Submission> getSubmissions(String handle, LocalDateTime from, LocalDateTime to) {
        String url = "https://codeforces.com/api/user.status?handle=" + handle + "&from=1&count=1000";

        var response = restTemplate.getForObject(url, SubmissionResponse.class);
        long fromEpoch = from.toEpochSecond(ZoneOffset.UTC);
        long toEpoch = to.toEpochSecond(ZoneOffset.UTC);

        return response.getResult().stream()
                .filter(sub -> sub.getCreationTimeSeconds() >= fromEpoch && sub.getCreationTimeSeconds() <= toEpoch)
                .collect(Collectors.toList());
    }

    @Override
    public boolean didSolve(String handle, String contestId, String problemIndex, LocalDateTime from, LocalDateTime to) {
        return getSubmissions(handle, from, to).stream()
                .anyMatch(s -> "OK".equals(s.getVerdict())
                        && s.getProblem().getContestId().equals(Integer.valueOf(contestId))
                        && s.getProblem().getIndex().equals(problemIndex));
    }
}
