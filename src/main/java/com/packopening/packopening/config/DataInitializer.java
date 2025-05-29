package com.packopening.packopening.config;

import com.packopening.packopening.model.Card;
import com.packopening.packopening.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CardRepository cardRepository;

    @Override
    public void run(String... args) {
        // Only add cards if the repository is empty
        if (cardRepository.count() == 0) {
            List<Card> initialCards = Arrays.asList(
                // Gold cards
                createCard("Cristiano Ronaldo", "Al Nassr", "Saudi Pro League", 86, Card.Rarity.GOLD,
                        "https://www.fifplay.com/img/fifa/23/players/p20801.png"),
                createCard("Mohamed Salah", "Liverpool", "Premier League", 89, Card.Rarity.GOLD,
                        "https://www.fifplay.com/img/fifa/23/players/p209331.png"),
                createCard("Kevin De Bruyne", "Manchester City", "Premier League", 91, Card.Rarity.GOLD,
                        "https://www.fifplay.com/img/fifa/23/players/p192985.png"),
                createCard("Kylian Mbappé", "Paris Saint-Germain", "Ligue 1", 91, Card.Rarity.GOLD,
                        "https://www.fifplay.com/img/fifa/23/players/p231747.png"),
                
                // Silver cards
                createCard("Tim Ream", "Fulham", "Premier League", 74, Card.Rarity.SILVER,
                        "https://www.fifplay.com/img/fifa/23/players/p189615.png"),
                createCard("Danny Welbeck", "Brighton", "Premier League", 73, Card.Rarity.SILVER,
                        "https://www.fifplay.com/img/fifa/23/players/p186146.png"),
                createCard("Scott McTominay", "Manchester United", "Premier League", 74, Card.Rarity.SILVER,
                        "https://www.fifplay.com/img/fifa/23/players/p221491.png"),
                
                // Bronze cards
                createCard("Harvey Blair", "Liverpool", "Premier League", 64, Card.Rarity.BRONZE,
                        "https://www.fifplay.com/img/fifa/23/players/p246174.png"),
                createCard("Kaide Gordon", "Liverpool", "Premier League", 64, Card.Rarity.BRONZE,
                        "https://www.fifplay.com/img/fifa/23/players/p246266.png"),
                createCard("Luke Mbete", "Manchester City", "Premier League", 63, Card.Rarity.BRONZE,
                        "https://www.fifplay.com/img/fifa/23/players/p246104.png")
            );

            // Save all cards to the repository
            cardRepository.saveAll(initialCards);
        }
    }

    private Card createCard(String name, String team, String league, int overall, Card.Rarity rarity, String imageUrl) {
        Card card = new Card();
        card.setName(name);
        card.setTeam(team);
        card.setLeague(league);
        card.setOverall(overall);
        card.setRarity(rarity);
        card.setImageUrl(imageUrl);
        return card;
    }
} 