package com.packopening.packopening.repository;

import com.packopening.packopening.model.Card;
import com.packopening.packopening.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUser(User user);
    List<Card> findByUserAndRarity(User user, Card.Rarity rarity);
} 