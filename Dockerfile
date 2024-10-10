FROM alpine:latest

# Instalar Python3, pip, git, bash e dependências
RUN apk --no-cache add python3 py3-pip git bash

# Instalar o pacote requests
RUN pip3 install requests

# Copiar o script para o contêiner
COPY pull-request.py /pull-request.py

# Definir o ponto de entrada (comando que será executado ao iniciar o contêiner)
CMD ["python3", "/pull-request.py"]
