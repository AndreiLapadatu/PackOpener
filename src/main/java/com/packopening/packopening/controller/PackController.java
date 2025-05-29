package com.packopening.packopening.controller;

import com.packopening.packopening.model.Card;
import com.packopening.packopening.model.User;
import com.packopening.packopening.repository.UserRepository;
import com.packopening.packopening.service.PackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/packs")
@CrossOrigin(origins = "http://localhost:3000")
public class PackController {

    @Autowired
    private PackService packService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/open")
    public ResponseEntity<?> openPack(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        String packType = request.get("packType").toString();
        
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        int packPrice = getPackPrice(packType);
        
        if (user.getCoins() < packPrice) {
            return ResponseEntity.badRequest().body("Not enough coins");
        }

        // Deduct coins
        user.setCoins(user.getCoins() - packPrice);
        userRepository.save(user);

        // Open pack and get cards
        List<Card> cards = packService.openPack(user, packType);
        return ResponseEntity.ok(cards);
    }

    private int getPackPrice(String packType) {
        return switch (packType) {
            case "basic" -> 500;
            case "premium" -> 1000;
            case "ultimate" -> 2000;
            default -> throw new IllegalArgumentException("Invalid pack type");
        };
    }
} 