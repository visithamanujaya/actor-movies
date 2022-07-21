'use strict';

const Hapi = require('@hapi/hapi');
const actorWorkflow = require('./src/workflow/actorWorkflow');
require('dotenv').config();


const init = async () => {

    const port = process.env.port || 3000;
    const server = Hapi.server({
        port,
        host: '0.0.0.0',
        routes: {
            "cors": true
        }
    });

    server.route({
        method: 'GET',
        path: '/actors',
        handler: (request, h) => {
            return actorWorkflow.listActors(request);
        }
    });
    server.route({
        method: 'POST',
        path: '/actors',
        handler: (request, h) => {
            return actorWorkflow.createActor(request);
        }
    });
    server.route({
        method: 'GET',
        path: '/actors/{id}',
        handler: (request, h) => {
            return actorWorkflow.getActorById(request);
        }
    });
    server.route({
        method: 'GET',
        path: '/actors/{id}/movies',
        handler: (request, h) => {
            return actorWorkflow.listMoviesByActorId(request);
        }
    });
    server.route({
        method: 'POST',
        path: '/actors/{id}/movies',
        handler: (request, h) => {
            return actorWorkflow.addMovie(request);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
