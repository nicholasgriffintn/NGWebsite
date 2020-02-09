## Simple Web Service

[![Greenkeeper badge](https://badges.greenkeeper.io/nicholasgriffintn/NGWebsite.svg?token=3b60e179c6ef60e49dfab111c324631b782cff64053839e8cc8e6df25f389c92&ts=1581260746124)](https://greenkeeper.io/)

### Setup

Copy the index file in this folder to the project root:

```bash
cd <project_folder>/

cp -r nodock/_examples/nginx/* .
```

### Usage

```bash
cd nodock/

docker-compose up -d node nginx
```

By going to `127.0.0.1` in your browser you should be seeing a nice greeting!
