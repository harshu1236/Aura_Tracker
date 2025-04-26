package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Custom query methods can be defined here if needed
    // For example, findByEmail(String email) or findByName(String name)
}
