FROM alpine:latest

# Instalar Python3, requests, git, bash e outras dependências
RUN apk --no-cache add python3 py3-pip py3-requests git bash

# Copiar o script para o contêiner
COPY pull-request.py /pull-request.py

# Definir o ponto de entrada (comando que será executado ao iniciar o contêiner)
CMD ["python3", "/pull-request.py"]
