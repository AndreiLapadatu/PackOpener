package com.packopening.packopening.controller;

import com.packopening.packopening.model.CompletedChallenge;
import com.packopening.packopening.model.User;
import com.packopening.packopening.repository.CompletedChallengeRepository;
import com.packopening.packopening.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {

    @Autowired
    private CompletedChallengeRepository challengeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CompletedChallenge>> getUserChallenges(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<CompletedChallenge> challenges = challengeRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(challenges);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeChallenge(@RequestBody CompletedChallenge challenge) {
        Optional<User> userOpt = userRepository.findById(challenge.getUser().getId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        
        // Check if challenge is already completed
        if (challengeRepository.existsByUserAndChallengeId(user, challenge.getChallengeId())) {
            return ResponseEntity.badRequest().body("Challenge already completed");
        }

        // Add reward coins (1500 for each challenge)
        user.setCoins(user.getCoins() + 1500);
        userRepository.save(user);

        // Save completed challenge
        challenge.setUser(user);
        challengeRepository.save(challenge);

        return ResponseEntity.ok().build();
    }
} 