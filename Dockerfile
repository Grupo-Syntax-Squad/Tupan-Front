FROM alpine:latest

# Instalar Python3, pip, git, bash e dependências
RUN apk --no-cache add python3 py3-pip git bash

# Criar e ativar um ambiente virtual, e instalar o pacote requests
RUN python3 -m venv /venv && \
    . /venv/bin/activate && \
    pip install requests

# Copiar o script para o contêiner
COPY pull-request.py /pull-request.py

# Definir o ponto de entrada (comando que será executado ao iniciar o contêiner)
CMD ["/venv/bin/python", "/pull-request.py"]
