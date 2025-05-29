package com.packopening.packopening.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "completed_challenges")
public class CompletedChallenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer challengeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Boolean completed = true;
} 