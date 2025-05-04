package com.harshit.AuraTracker.adminAuth;

import com.harshit.AuraTracker.modal.Admin;
import com.harshit.AuraTracker.Security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/admin")
@CrossOrigin(origins = "*")
public class adminAuthController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private static final String HARDCODED_EMAIL = "admin@com";
    private static final String HARDCODED_PASSWORD = "123456"; // plaintext password for testing

    @PostMapping("/login")
    public AuthResponseForAdmin login(@RequestBody Admin loginRequest) {
        // Check email match
        if (!HARDCODED_EMAIL.equals(loginRequest.getEmail())) {
            return new AuthResponseForAdmin(null, "Invalid email", null);
        }

        // Check password match
        if (!HARDCODED_PASSWORD.equals(loginRequest.getPassword().trim())) {
            return new AuthResponseForAdmin(null, "Invalid password", null);
        }

        // If both match, create a dummy admin object
        Admin hardcodedAdmin = new Admin();
        hardcodedAdmin.setId(1L); // set ID manually
        hardcodedAdmin.setName("Super Admin");
        hardcodedAdmin.setEmail(HARDCODED_EMAIL);
        hardcodedAdmin.setPassword(HARDCODED_PASSWORD); // normally you wouldn’t return this

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(hardcodedAdmin.getEmail());

        return new AuthResponseForAdmin(token, "Login Successful (Hardcoded Admin)", hardcodedAdmin);
    }
}
