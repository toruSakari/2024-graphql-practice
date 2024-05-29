FROM node:18-bullseye-slim AS node
FROM debian

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl \
    git

RUN curl -fsSL https://bun.sh/install | bash

# drizzle-kitがbunでは動作しないので、npmもつかえるようにしておく。
COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
COPY --from=node /opt/yarn* /opt/yarn
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn && \
    ln -fs /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg

WORKDIR /app
