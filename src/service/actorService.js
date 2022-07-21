const { executeSelect, executeInsert}  = require('../db/connection');

const getActorById = async (id) => {
    const sql = "select * from actor where id = $1";
    const values = [id];
    try {
        const res = await executeSelect(sql, values);
        return res;
    } catch (err) {
        console.log(`Error executing getActorById ${err.message}`);
        throw err;
    }
}

const listActors = async (limit, offset) => {
    const sql = "select * from actor limit $1 offset $2";
    const values = [limit, offset];
    try {
        const res = await executeSelect(sql, values);
        return res;
    } catch (err) {
        console.log(`Error executing listActors ${err.message}`);
        throw err;
    }
}

const listActorMovies = async (actorId) => {
    const sql = `select m.name, m.release_date from
    actor a join actor_movie_map amm on a.id = amm.actor_id
    join movie m on m.id = amm.movie_id where a.id = $1`;
    const values = [actorId];
    try {
        const res = await executeSelect(sql, values);
        return res;
    } catch (err) {
        console.log(`Error executing listActorMovies ${err.message}`);
        throw err;
    }
}

const addActor = async ({firstName, lastName, age}) => {
    const sql = `insert into actor (first_name, last_name, age) values ($1, $2, $3) returning id`;
    const values = [firstName, lastName, age];
    try {
        const res = await executeInsert(sql, values);
        return res['rows'][0]['id'];
    } catch (err) {
        console.log(`Error executing addActor ${err.message}`);
        throw err;
    }
}

const addMovie = async ({name, releaseDate}) => {
    const sql = `insert into movie (name, release_date) values ($1, $2)  returning id`;
    const values = [name, releaseDate];
    try {
        const res = await executeInsert(sql, values);
        return res['rows'][0]['id'];
    } catch (err) {
        console.log(`Error executing addMovie ${err.message}`);
        throw err;
    }
}


const addActorMovieMap = async ({actorId, movieId}) => {
    const sql = `insert into actor_movie_map (actor_id, movie_id) values ($1, $2)`;
    const values = [actorId, movieId];
    try {
        const res = await executeInsert(sql, values);
        return res;
    } catch (err) {
        console.log(`Error executing addActorMovieMap ${err.message}`);
        throw err;
    }
}

module.exports = {
    getActorById,
    listActors,
    listActorMovies,
    addActor,
    addMovie,
    addActorMovieMap
}