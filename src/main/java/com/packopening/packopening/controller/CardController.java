package com.packopening.packopening.controller;

import com.packopening.packopening.model.Card;
import com.packopening.packopening.model.User;
import com.packopening.packopening.repository.CardRepository;
import com.packopening.packopening.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Card>> getUserCards(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Card> cards = cardRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(cards);
    }

    @PostMapping("/quicksell/{cardId}")
    public ResponseEntity<?> quicksellCard(@PathVariable Long cardId) {
        Optional<Card> cardOpt = cardRepository.findById(cardId);
        if (cardOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Card card = cardOpt.get();
        User user = card.getUser();
        int quicksellValue = getQuicksellValue(card.getRarity());
        
        user.setCoins(user.getCoins() + quicksellValue);
        userRepository.save(user);
        cardRepository.delete(card);

        return ResponseEntity.ok().build();
    }

    private int getQuicksellValue(Card.Rarity rarity) {
        return switch (rarity) {
            case GOLD -> 300;
            case SILVER -> 150;
            case BRONZE -> 100;
        };
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCard(@RequestBody Card card) {
        Optional<User> userOpt = userRepository.findById(card.getUser().getId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        card.setUser(userOpt.get());
        Card savedCard = cardRepository.save(card);
        return ResponseEntity.ok(savedCard);
    }
} 