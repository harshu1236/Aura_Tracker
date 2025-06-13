package com.harshit.AuraTracker.Service;
import com.harshit.AuraTracker.modal.Compete;
import com.harshit.AuraTracker.modal.Student;

import java.util.List;

public interface CompeteService {

    Compete startDuel(Student challenger, Student opponent, int durationMinutes);

    Compete endDuel(Long competeId);

    List<Compete> getDuelsForStudent(Student student);

    List<Compete> getOngoingDuels();

    List<Compete> getCompletedDuels();
}

