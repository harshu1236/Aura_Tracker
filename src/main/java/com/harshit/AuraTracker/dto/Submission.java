package com.harshit.AuraTracker.dto;

import lombok.Data;

@Data
public class Submission {
    private Integer id;
    private Integer creationTimeSeconds;
    private String verdict;
    private CodeforcesProblem problem;
}
