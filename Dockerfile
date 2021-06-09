FROM --platform=linux/amd64 node:16-buster-slim as BUILDER

WORKDIR /usr/src/app

ENV NODE_ENV="development"

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node tsconfig* .
COPY --chown=node:node src/ src/
COPY --chown=node:node scripts/ scripts/

RUN yarn install --production=false --frozen-lockfile --link-duplicates

RUN yarn build

# ================ #
#   Runner Stage   #
# ================ #

FROM --platform=linux/amd64 node:16-buster-slim AS RUNNER

ENV NODE_ENV="production"

WORKDIR /usr/src/app

RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get install -y \
	dumb-init \
	&& \
	rm -rf /var/lib/apt/lists/*

COPY --chown=node:node --from=BUILDER /usr/src/app/dist dist

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn install --production=true --frozen-lockfile --link-duplicates --ignore-scripts

USER node

CMD [ "dumb-init", "yarn", "start", "--enable-source-maps" ]
