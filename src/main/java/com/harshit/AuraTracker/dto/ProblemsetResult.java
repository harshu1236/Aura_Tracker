package com.harshit.AuraTracker.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProblemsetResult {
    private List<CodeforcesProblem> problems;
}
