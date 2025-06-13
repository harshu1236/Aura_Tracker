package com.harshit.AuraTracker.dto;

import lombok.Data;
import java.util.List;

@Data
public class CodeforcesProblem {
    private Integer contestId;
    private String index;
    private String name;
    private Integer rating;
    private List<String> tags;
}
