const actorService = require('../service/actorService');

const getActorById = (request) => {
    const actorId = request.params.id;
    return actorService.getActorById(actorId);
}

const listActors = async (request) => {
    try {
        const limit = request.query.limit || 10;
        const offset = request.query.offset || 0;
        const actors = await actorService.listActors(limit, offset);
        const actorCount = await actorService.getActorCount();
        return {
            actors,
            actorCount: parseInt(actorCount[0]['actor_count'])
        }
    } catch (err) {
        throw err;
    }
}

const listMoviesByActorId = (request) => {
    const actorId = request.params.id;
    return actorService.listActorMovies(actorId);
}

const createActor = (request) => {
    const {firstName, lastName, age} = request.payload;
    return actorService.addActor({firstName, lastName, age});
}

const addMovie = async (request) => {
    const actorId = request.params.id;
    const {name, releaseDate} = request.payload;
    try {
        const movieId = await actorService.addMovie({name, releaseDate});
        await actorService.addActorMovieMap({actorId, movieId});
        return movieId;
    } catch (err) {
        console.log("Error in adding a movie - ", err.message);
        throw err;
    }
}

module.exports = {
    getActorById,
    listActors,
    listMoviesByActorId,
    createActor,
    addMovie
}