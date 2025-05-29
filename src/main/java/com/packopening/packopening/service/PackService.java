package com.packopening.packopening.service;

import com.packopening.packopening.model.Card;
import com.packopening.packopening.model.User;
import com.packopening.packopening.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class PackService {

    @Autowired
    private CardRepository cardRepository;

    private final Random random = new Random();

    @Transactional
    public List<Card> openPack(User user, String packType) {
        List<Card> allCards = cardRepository.findAll();
        List<Card> goldCards = allCards.stream()
                .filter(c -> c.getRarity() == Card.Rarity.GOLD && c.getUser() == null)
                .collect(Collectors.toList());
        List<Card> silverCards = allCards.stream()
                .filter(c -> c.getRarity() == Card.Rarity.SILVER && c.getUser() == null)
                .collect(Collectors.toList());
        List<Card> bronzeCards = allCards.stream()
                .filter(c -> c.getRarity() == Card.Rarity.BRONZE && c.getUser() == null)
                .collect(Collectors.toList());

        List<Card> packCards = new ArrayList<>();

        switch (packType) {
            case "basic":
                // 5 cards, 1 guaranteed gold
                packCards.add(getRandomCard(goldCards, user));
                for (int i = 0; i < 4; i++) {
                    packCards.add(getRandomCardByRarity(bronzeCards, silverCards, goldCards, user));
                }
                break;

            case "premium":
                // 8 cards, 4 guaranteed gold
                for (int i = 0; i < 4; i++) {
                    packCards.add(getRandomCard(goldCards, user));
                }
                for (int i = 0; i < 4; i++) {
                    packCards.add(getRandomCardByRarity(bronzeCards, silverCards, goldCards, user));
                }
                break;

            case "ultimate":
                // 10 cards, 1 guaranteed 85+ rated
                List<Card> highRatedCards = goldCards.stream()
                        .filter(c -> c.getOverall() >= 85)
                        .collect(Collectors.toList());
                packCards.add(getRandomCard(highRatedCards, user));
                for (int i = 0; i < 9; i++) {
                    packCards.add(getRandomCardByRarity(bronzeCards, silverCards, goldCards, user));
                }
                break;
        }

        return cardRepository.saveAll(packCards);
    }

    private Card getRandomCard(List<Card> cards, User user) {
        if (cards.isEmpty()) {
            throw new RuntimeException("No cards available");
        }
        Card originalCard = cards.get(random.nextInt(cards.size()));
        return cloneCard(originalCard, user);
    }

    private Card getRandomCardByRarity(List<Card> bronzeCards, List<Card> silverCards, List<Card> goldCards, User user) {
        double rand = random.nextDouble();
        if (rand < 0.6) {
            return getRandomCard(bronzeCards, user);
        } else if (rand < 0.9) {
            return getRandomCard(silverCards, user);
        } else {
            return getRandomCard(goldCards, user);
        }
    }

    private Card cloneCard(Card original, User user) {
        Card newCard = new Card();
        newCard.setName(original.getName());
        newCard.setTeam(original.getTeam());
        newCard.setLeague(original.getLeague());
        newCard.setOverall(original.getOverall());
        newCard.setRarity(original.getRarity());
        newCard.setImageUrl(original.getImageUrl());
        newCard.setUser(user);
        return newCard;
    }
} 