package com.packopening.packopening.repository;

import com.packopening.packopening.model.CompletedChallenge;
import com.packopening.packopening.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompletedChallengeRepository extends JpaRepository<CompletedChallenge, Long> {
    List<CompletedChallenge> findByUser(User user);
    boolean existsByUserAndChallengeId(User user, Integer challengeId);
} 