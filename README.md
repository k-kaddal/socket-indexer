# Socket Indexer

## Overview

Socket Indexer is a real-time bridging event service designed to monitor, enrich, store, and broadcast events from the SocketGate Protocol.

It is built with modularity in mind. Each module (`event-listener`, `data-processor`, `api-server`) is independent, making it possible to easily separate them into their own Docker containers for isolation and scaling.

1. `event-listener`: Listens to SocketGate SocketBridge events and publishes them for `data-processor` to consume.

2. `data-processor`: Processes raw events, enriches them with token Metadata, stores them in the database, and publishes enriched events for the `api-server` to consume.

3. `api-server`: Provides two endpoints for clients:

   - `api/v1/events/stream`: Stream real-time enriched events, as a message consumer.
   - `api/v1/events/:id`: Fetch enriched event by id from database.
     (here the id is concat of `transactionHas-index`)

## Setup Instructions

### Step 1: Environment Variables

Create a `.env` from the `.env.example`:

```bash
cp .env.example .env
```

### Step 2: Start the Containers

To start Docker containers and log the `socket-indexer`:

```bash
make up
```

### Step 3: Hit the APIs

- The API server will be available at `http://localhost:8080`.
- Endpoints:
  - `/api/v1/events/:id`: Fetch an event by ID.
  - `/api/v1/events/stream`: Stream real-time enriched events.

## Stopping the Services

To stop all services and kill the database:

```bash
make down
make drop-db
```

## Docker Containers

1. **socket-indexer**: One container for three modules: `api-server`, `event-listener`, `data-processor`.
2. **socket-database**: A PostgreSQL database to store all enriched and processed bridging events.
3. **socket-broker**: A RabbitMQ broker to manage message queues for inter-module communication.

## Areas for Improvement

- `socket-indexer`: [] Separate each module into its own container for isolation and scaling.
- `api-server`: [] Improve error handling and request/response middlewares.
- `api-server`: [] Add `api/v1/events` to getEvents with indexed cursor pagination
- `data-processor`: [] Enhance the data enrichment process with more metadata

---
