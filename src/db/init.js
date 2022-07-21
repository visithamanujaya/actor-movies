const sqlite3 = require('sqlite3').verbose();

exports.createDatabase = () => {
    let newBb = new sqlite3.Database('actor.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            return;
        }
        createTables(newBb);
        return newBb;
    });
}

const createTables = (newBb) => {
    newBb.exec(`
    create table actor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name text not null,
        last_name text not null,
        age int not null
    );
    insert into actor (id, first_name, last_name, age)
        values (1, 'Patricia', 'Andrew', 32),
               (2, 'Tommie', 'Wood', 23),
               (3, 'Zak', 'Frost', 34),
               (4, 'Zainab', 'Webster', 27),
               (5, 'Diya', 'Houston', 24),
               (6, 'Nikki', 'Jeffery', 39),
               (7, 'Luci', 'Mckinney', 22),
               (8, 'Dafydd', 'Sellers', 55),
               (9, 'Sulaiman', 'Hernandez', 58),
               (10, 'Beverly', 'Good', 86),
               (11, 'Derrick', 'Roy', 32),
               (12, 'Laurel', 'Boyd', 38),
               (13, 'Kayden', 'Cordova', 40),
               (14, 'Kiah', 'Patrick', 46),
               (15, 'Marwah', 'Cabrera', 23),
               (16, 'Kaitlyn', 'Graham', 39),
               (17, 'Deanne', 'Wickens', 79),
               (18, 'Branden', 'Hurley', 29),
               (19, 'Missy', 'Caldwell', 27),
               (20, 'Abbie', 'Jackson', 47),
               (21, 'Romany', 'Pierce', 56);

    create table movie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text not null,
        release_date text not null
    );

    insert into movie (id, name, release_date)
        values (1, 'Man With Tentacles', '2010-10-12'),
               (2, 'Stranger Of New Worlds', '2011-11-30'),
               (3, 'Officers Of The Worlds', '2011-11-30'),
               (4, 'Cyborgs On Mars', '2011-11-30'),
               (5, 'Traitors And Boys', '2011-11-30'),
               (6, 'Traitors And Leaders', '2011-11-30'),
               (7, 'Doom Of Mens Legacy', '2011-11-30'),
               (8, 'Culling Of The New World', '2011-11-30'),
               (9, 'Complexity Of Space Flight', '2011-11-30'),
               (10, 'Mother Of The Titans', '2011-11-30'),
               (11, 'Dependent On The Moon', '2011-11-30'),
               (12, 'Stranger To The Robotic Police', '2011-11-30'),
               (13, 'Secrets Of Time Travellers', '2011-11-30');
    create table actor_movie_map (
        actor_id int not null,
        movie_id int not null
    );   
    insert into actor_movie_map (actor_id, movie_id)
        values (1, 1),
               (1, 2), 
               (1, 5), 
               (1, 6), 
               (1, 9), 
               (1, 11), 
               (2, 1), 
               (2, 2), 
               (2, 3), 
               (2, 13), 
               (2, 12), 
               (2, 7), 
               (3, 7),
               (3, 5),
               (3, 6),
               (3, 9),
               (3, 8),
               (3, 1),
               (3, 2),
               (4, 2),
               (4, 3),
               (4, 5),
               (4, 2),
               (4, 1)
        `, (err)  => {
        if(err){
            console.log('Tables are already there');
        } else {
            console.log('DB created successfully');
        }
    });
}
