from app.models import db, VideoContent, environment, SCHEMA
from sqlalchemy.sql import text


def seed_videos():
    videos = [
        VideoContent(
            title="Bob Marley: One Love",
            description="The story of how reggae icon Bob Marley overcame adversity, and the journey behind his revolutionary music.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob-marley-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/bob+marley.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Godzilla and Kong",
            description="The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla-kong-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/godzilla+and+kong.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Moana",
            description="In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/moana.mp4",
            user_id=3,
        ),
        VideoContent(
            title="A Quiet Place",
            description="A family struggles for survival in a world where most humans have been killed by blind but noise-sensitive creatures. They are forced to communicate in sign language to keep the creatures at bay.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet-place-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/quiet+place.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Spaceman",
            description="Jakub Procházka, orphaned as a boy and raised in the Czech countryside by his grandparents, overcomes his odds to become the country's first astronaut.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman-thumbnail.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spaceman.mp4",
            user_id=5,
        ),
        VideoContent(
            title="Asteroid City",
            description="Following a writer on his world famous fictional play about a grieving father who travels with his tech-obsessed family to small rural Asteroid City to compete in a junior stargazing event, only to have his world view disrupted forever.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/asteroid-city.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Elemental",
            description="Follows Ember and Wade, in a city where fire-, water-, earth- and air-residents live together.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/elemental.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Guardians of the Galaxy",
            description="Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/guardians.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=3,
        ),
        VideoContent(
            title="Indiana Jones",
            description="In 1935, Indiana Jones is tasked by Indian villagers with reclaiming a rock stolen from them by a secret cult beneath the catacombs of an ancient palace.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/indiana-jones.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Little Mermaid",
            description="A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/littlemermaid.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=5,
        ),
        VideoContent(
            title="Spiderman",
            description="Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
            genre="Drama",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/spiderman.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Ruby Gillman, Teenage Kraken",
            description="A shy adolescent learns that she comes from a fabled royal family of legendary sea krakens and that her destiny lies in the depths of the waters, which is bigger than she could have ever imagined.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/teen-kraken.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Transformers",
            description="In ancient Polynesia, when a terrible curse incurred by the demigod Maui reaches Moana's island, she answers the Ocean's call to seek out Maui to set things right.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/transformers.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=3,
        ),
        VideoContent(
            title="No Hard Feelings",
            description="On the brink of losing her home, Maddie finds an intriguing job listing: helicopter parents looking for someone to bring their introverted 19-year-old son out of his shell before college. She has one summer to make him a man or die trying.",
            genre="Horror",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/hard-feelings.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=4,
        ),
        VideoContent(
            title="The Flash",
            description="Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/the-flash.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=5,
        ),
        VideoContent(
            title="Mad Max: Fury Road",
            description="In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from cult leader Immortan Joe and his army in an action-packed chase.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/Mad_Max_Fury_Road.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=3,
        ),
        VideoContent(
            title="John Wick",
            description="An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/JOhnWick.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Die Hard",
            description="NYPD officer John McClane tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/DieHard.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=2,
        ),
        VideoContent(
            title="The Dark Knight",
            description="When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre="Action",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/TDK.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=4,
        ),
        VideoContent(
            title="Superbad",
            description="Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/SuperGood.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=5,
        ),
        VideoContent(
            title="The Hangover",
            description="Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/THO.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Groundhog Day",
            description="A weatherman finds himself inexplicably living the same day over and over again.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/GroundHog.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Bridesmaids",
            description="Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
            genre="Comedy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/Bms.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=3,
        ),
        VideoContent(
            title="Dune",
            description="A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/Dune.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="The Lord of the Rings: The Fellowship of the Ring",
            description="A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/LotR.jpg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
        VideoContent(
            title="Harry Potter and the Sorcerer's Stone",
            description="An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evils that haunt the magical world.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/HPss.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=2,
        ),
        VideoContent(
            title="Dune: Part Two",
            description="Following the events of the first part, 'Dune: Part Two' continues the story of Paul Atreides as he joins forces with the Fremen to avenge his family and fight for the freedom of Arrakis.",
            genre="Fantasy",
            thumbnail_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/Dune22.jpeg",
            video_url="https://indieroll-bucket.s3.us-east-2.amazonaws.com/test-movie.mp4",
            user_id=1,
        ),
    ]

    db.session.add_all(videos)
    db.session.commit()
    print("Videos seeded")


def undo_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.video_content RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM video_content"))

    db.session.commit()
