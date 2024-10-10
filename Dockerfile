FROM alpine:latest

# Instalar Python3, pip, git, bash e as dependências necessárias
RUN apk --no-cache add python3 py3-pip git bash build-base && \
    python3 -m ensurepip && \
    pip3 install --upgrade pip && \
    pip3 install requests

# Copiar o script para o contêiner
COPY pull-request.py /pull-request.py

# Definir o ponto de entrada (comando que será executado ao iniciar o contêiner)
CMD ["python3", "/pull-request.py"]
