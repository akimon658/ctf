#syntax=docker/dockerfile:1
FROM --platform=linux/amd64 ubuntu:24.04

RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get --no-install-recommends install -y \
    binutils \
    build-essential \
    ca-certificates \
    curl \
    gdb \
    git \
    netcat-openbsd \
    python3 \
    sudo \
    unrar

RUN echo ubuntu ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/ubuntu && \
    chmod 0440 /etc/sudoers.d/ubuntu

USER ubuntu

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    git clone --depth=1 https://github.com/pwndbg/pwndbg.git ~/pwndbg && \
    cd ~/pwndbg && \
    ./setup.sh && \
    cd ~ && \
    rm -rf ~/pwndbg
