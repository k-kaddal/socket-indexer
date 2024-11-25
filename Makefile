up:
	docker-compose up --build -d
	docker-compose logs -f socket-indexer

down:
	docker-compose down

drop-db:
	docker-compose down
	docker volume rm socket-indexer_pgdata
