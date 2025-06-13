package com.harshit.AuraTracker.dto;

import lombok.Data;
import java.util.List;

@Data
public class SubmissionResponse {
    private String status;
    private List<Submission> result;
}
