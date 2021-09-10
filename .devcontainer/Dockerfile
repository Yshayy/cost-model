FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV SHELL=/usr/bin/zsh

ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby Engine instead of the licensed Docker Engine
ARG USE_MOBY="true"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.

ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/docker-in-docker-debian.sh
RUN bash ./docker-in-docker-debian.sh

VOLUME [ "/var/lib/docker" ]

RUN curl -sSL -o /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x /usr/local/bin/kubectl

RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-19.03.9.tgz | \
    tar zxvf - --strip 1 -C /usr/bin docker/docker
    
RUN sed -i "/plugins=/c\plugins=(docker git kubectl)" /home/vscode/.zshrc
# Install k3d
RUN curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash

# install Helm 
RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

RUN apt update
### Installing golang 1.16
RUN curl -L https://golang.org/dl/go1.16.linux-amd64.tar.gz | sudo tar -xz -C /usr/local
ENV PATH=$PATH:/usr/local/go/bin:/home/vscode/go/bin
RUN apt-get install -y gccgo
USER vscode
RUN go get -v golang.org/x/tools/gopls \
              github.com/ramya-rao-a/go-outline 
USER root

### Install nodejs & zx
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs gcc g++ make
RUN npm i -g zx

### Install Tilt
RUN curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]