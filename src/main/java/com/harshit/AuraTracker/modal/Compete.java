package com.harshit.AuraTracker.modal;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "compete")
public class Compete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Challenger = student who initiates
    @ManyToOne
    @JoinColumn(name = "challengerId")
    private Student challenger;

    // Opponent = student who is challenged
    @ManyToOne
    @JoinColumn(name = "opponentId")
    private Student opponent;

    // Codeforces Problem Info
    private String contestId;
    private String problemIndex;   // A, B, C...
    private String problemName;
    private String problemUrl;

    private LocalDateTime startTime;
    private LocalDateTime deadline;

    private boolean completed = false;

    // Winner = reference to the student who won
    @ManyToOne
    @JoinColumn(name = "winnerId")
    private Student winner;

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public Student getChallenger() {
        return challenger;
    }

    public void setChallenger(Student challenger) {
        this.challenger = challenger;
    }

    public Student getOpponent() {
        return opponent;
    }

    public void setOpponent(Student opponent) {
        this.opponent = opponent;
    }

    public String getContestId() {
        return contestId;
    }

    public void setContestId(String contestId) {
        this.contestId = contestId;
    }

    public String getProblemIndex() {
        return problemIndex;
    }

    public void setProblemIndex(String problemIndex) {
        this.problemIndex = problemIndex;
    }

    public String getProblemName() {
        return problemName;
    }

    public void setProblemName(String problemName) {
        this.problemName = problemName;
    }

    public String getProblemUrl() {
        return problemUrl;
    }

    public void setProblemUrl(String problemUrl) {
        this.problemUrl = problemUrl;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Student getWinner() {
        return winner;
    }

    public void setWinner(Student winner) {
        this.winner = winner;
    }
}

