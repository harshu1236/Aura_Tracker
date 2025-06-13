package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.CompeteRepository;
import com.harshit.AuraTracker.modal.Compete;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompeteServiceImpl implements CompeteService {

    @Autowired
    private CompeteRepository competeRepository;

    @Autowired
    private CodeforcesService codeforcesService;

    @Override
    public Compete startDuel(Student challenger, Student opponent, int durationMinutes) {
        // Get a random problem from Codeforces
        var problem = codeforcesService.getRandomProblem("greedy", 800, 1400);

        Compete compete = new Compete();
        compete.setChallenger(challenger);
        compete.setOpponent(opponent);
        compete.setContestId(String.valueOf(problem.getContestId()));
        compete.setProblemIndex(problem.getIndex());
        compete.setProblemName(problem.getName());
        compete.setProblemUrl("https://codeforces.com/contest/" + problem.getContestId() + "/problem/" + problem.getIndex());

        LocalDateTime start = LocalDateTime.now();
        compete.setStartTime(start);
        compete.setDeadline(start.plusMinutes(durationMinutes));
        compete.setCompleted(false);

        return competeRepository.save(compete);
    }

    @Override
    public Compete endDuel(Long competeId) {
        Compete duel = competeRepository.findById(competeId).orElseThrow();

        if (duel.isCompleted()) return duel;

        // Fetch who solved the problem first
        boolean challengerSolved = codeforcesService.didSolve(
                duel.getChallenger().getCodeforcesHandle(),
                duel.getContestId(),
                duel.getProblemIndex(),
                duel.getStartTime(),
                duel.getDeadline()
        );

        boolean opponentSolved = codeforcesService.didSolve(
                duel.getOpponent().getCodeforcesHandle(),
                duel.getContestId(),
                duel.getProblemIndex(),
                duel.getStartTime(),
                duel.getDeadline()
        );

        if (challengerSolved && !opponentSolved) {
            duel.setWinner(duel.getChallenger());
        } else if (!challengerSolved && opponentSolved) {
            duel.setWinner(duel.getOpponent());
        } else {
            duel.setWinner(null); // draw
        }

        duel.setCompleted(true);
        return competeRepository.save(duel);
    }

    @Override
    public List<Compete> getDuelsForStudent(Student student) {
        return competeRepository.findByChallengerOrOpponent(student, student);
    }

    @Override
    public List<Compete> getOngoingDuels() {
        return competeRepository.findByCompletedFalse();
    }

    @Override
    public List<Compete> getCompletedDuels() {
        return competeRepository.findAll().stream()
                .filter(Compete::isCompleted)
                .toList();
    }
}
