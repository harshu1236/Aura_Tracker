package com.harshit.AuraTracker.dto;

import lombok.Data;

@Data
public class DuelRequest {
    private Long challengerId;
    private Long opponentId;
    private int duration; // in minutes
}
