package com.packopening.packopening.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String team;

    @Column(nullable = false)
    private String league;

    @Column(nullable = false)
    private Integer overall;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    private String imageUrl;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    public enum Rarity {
        BRONZE, SILVER, GOLD
    }
} 