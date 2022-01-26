## Notes: (more so for myself)

### Commands
- - `docker build -t aozora .` builds image from current directory with tag 'aozora'
- - `docker run -d --rm --name aozorabot aozora` initializes a container with name 'aozorabot' using the 'aozora' image
- - `docker stop container-name` stops the container
- - `dockter start container-name` starts the container, if --rm was omitted in run command
- - `docker logs aozora` view Docker logs from the container
- General
- - workdir /balti : a tribute to Yogscast Whale Lords
- - `-d` : runs container as detached (can use the same terminal window again, container will keep running)
- - `--rm` : remove container and anonymous volumes after container stops
- - `docker inspect container | volume :name` : inspect a container or volume
- Volumes
- - `-v` : path/to/working/directory:/balti is a named volume that we can access, allows code sharing
- - `-v` : /balti an anonymous volume, useful in this project for keeping node_modules from being overwriten by named volume
- - `-v path:ro` : mark a volume as read-only (volumes deeper into the path will overwrite this)
- Namespaces
- - aozorabot : the name of the container
- - aozora : the image/repository of the container
- Clean Up
- - `docker volume prune` - remove unused named volumes
- - `docker volume rm volume_name` - remove a named volume, must not be used in running container

#### Interacting with a running container
- `docker run -it -d node` - run a container named `node` in detached interactive mode
- `docker exec -it :container_name :command` - runs :command in :container_name while it is running, e.g., `npm init` to create a node project in that container
- `docker run -it :container_name npm init` - overrides the default command of a container and runs `npm init`

### Networks
- `--network :name` : tells Docker to run container in network of :name
- - replace `localhost` in URLs with the name of the network, e.g., `mongodb://localhost:27017` → `mongodb://azr-net:27017`, except for the frontend since the browser can't use that
- `docker network ls` : list available Docker networks on your machine

## Workflow

### Development (without docker-compose)
- `docker build -t aozora:dev .`
- `docker network create azr-net`
macOS/Linux
- `docker run -d --rm --network azr-net --env-file ./.env -v $(pwd):/balti:ro -v /balti/node_modules --name aozorabot aozora:dev`
Windows
- `docker run -d --rm --network azr-net --env-file ./.env -v "%cd%":/balti:ro -v /balti/node_modules --name aozorabot aozora:dev`

### Development Command Notes
- Code changes to the bot folder will require the container to be restarted to see changes as it relies on ts-node, and Discord doesn't seem to like nodemon managing that.
- Currently the named volume of this project directory isn't working for me on macOS ARM, but hopefully it will for you. (It either fails to run the container or creates a temporary volume).
- Frontend containers should include the `-it` flag so the server doesn't die.

### Production
- `docker build -t aozora .`
- `docker run -d --rm --network azr-net --name aozorabot juiceboxh3ro/aozora:latest`
