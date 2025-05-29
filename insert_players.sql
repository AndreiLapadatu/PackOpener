-- Gold Players (75-99)
INSERT INTO cards (name, team, league, overall, rarity, image_url) VALUES
('Cristiano Ronaldo', 'Al Nassr', 'Saudi Pro League', 86, 'gold', 'https://example.com/ronaldo.jpg'),
('Mohamed Salah', 'Liverpool', 'Premier League', 89, 'gold', 'https://example.com/salah.jpg'),
('Kevin De Bruyne', 'Manchester City', 'Premier League', 91, 'gold', 'https://example.com/kdb.jpg'),
('Kylian Mbappe', 'Paris Saint-Germain', 'Ligue 1', 91, 'gold', 'https://example.com/mbappe.jpg'),
('Erling Haaland', 'Manchester City', 'Premier League', 91, 'gold', 'https://example.com/haaland.jpg'),
('Virgil van Dijk', 'Liverpool', 'Premier League', 89, 'gold', 'https://example.com/vvd.jpg'),
('Luka Modric', 'Real Madrid', 'La Liga', 87, 'gold', 'https://example.com/modric.jpg'),
('Bruno Fernandes', 'Manchester United', 'Premier League', 85, 'gold', 'https://example.com/bruno.jpg'),
('Joshua Kimmich', 'Bayern Munich', 'Bundesliga', 88, 'gold', 'https://example.com/kimmich.jpg'),
('Thibaut Courtois', 'Real Madrid', 'La Liga', 90, 'gold', 'https://example.com/courtois.jpg');

-- Add more gold players (75-84)
INSERT INTO cards (name, team, league, overall, rarity) VALUES
('Mason Mount', 'Manchester United', 'Premier League', 80, 'gold'),
('Christian Pulisic', 'AC Milan', 'Serie A', 78, 'gold'),
('Kieran Trippier', 'Newcastle', 'Premier League', 83, 'gold'),
('Olivier Giroud', 'AC Milan', 'Serie A', 79, 'gold'),
('Lucas Hernandez', 'PSG', 'Ligue 1', 82, 'gold');

-- Silver Players (70-74)
INSERT INTO cards (name, team, league, overall, rarity) VALUES
('Tim Ream', 'Fulham', 'Premier League', 74, 'silver'),
('Danny Welbeck', 'Brighton', 'Premier League', 73, 'silver'),
('Scott McTominay', 'Manchester United', 'Premier League', 74, 'silver'),
('Daniel James', 'Leeds United', 'Championship', 72, 'silver'),
('Ryan Kent', 'Fenerbahce', 'Super Lig', 71, 'silver');

-- Bronze Players (60-69)
INSERT INTO cards (name, team, league, overall, rarity) VALUES
('John Smith', 'League Two FC', 'League Two', 65, 'bronze'),
('James Wilson', 'League One United', 'League One', 67, 'bronze'),
('Tom Brown', 'Second Division FC', 'Second Division', 63, 'bronze'),
('Mike Johnson', 'Third Division United', 'Third Division', 64, 'bronze'),
('Chris Davis', 'Fourth Tier FC', 'Fourth Division', 66, 'bronze');

-- Generate more random players
DO $$
DECLARE
    first_names TEXT[] := ARRAY['Alex', 'James', 'John', 'David', 'Michael', 'Robert', 'William', 'Thomas', 'Daniel', 'Paul'];
    last_names TEXT[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    teams TEXT[] := ARRAY['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H', 'Team I', 'Team J'];
    leagues TEXT[] := ARRAY['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Eredivisie', 'Liga NOS', 'Super Lig'];
    i INTEGER;
    player_name TEXT;
    team TEXT;
    league TEXT;
    rating INTEGER;
    rarity TEXT;
BEGIN
    FOR i IN 1..470 LOOP
        player_name := first_names[1 + floor(random() * array_length(first_names, 1))] || ' ' ||
                      last_names[1 + floor(random() * array_length(last_names, 1))];
        team := teams[1 + floor(random() * array_length(teams, 1))];
        league := leagues[1 + floor(random() * array_length(leagues, 1))];
        
        -- Distribute ratings: 60% bronze, 30% silver, 10% gold
        IF random() < 0.6 THEN
            rating := 60 + floor(random() * 10); -- Bronze (60-69)
            rarity := 'bronze';
        ELSIF random() < 0.75 THEN
            rating := 70 + floor(random() * 5);  -- Silver (70-74)
            rarity := 'silver';
        ELSE
            rating := 75 + floor(random() * 10); -- Gold (75-84)
            rarity := 'gold';
        END IF;
        
        INSERT INTO cards (name, team, league, overall, rarity)
        VALUES (player_name, team, league, rating, rarity);
    END LOOP;
END $$; 