package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
