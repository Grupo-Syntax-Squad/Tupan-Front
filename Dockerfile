FROM alpine:latest

# Instalar Python3, pip, git, bash e as dependências necessárias
RUN apk --no-cache add python3 py3-pip git bash

# Criar e ativar um ambiente virtual
RUN python3 -m venv /env
ENV PATH="/env/bin:$PATH"

# Instalar o pacote requests no ambiente virtual
RUN pip install --upgrade pip && \
    pip install requests

# Copiar o script para o contêiner
COPY pull-request.py /pull-request.py

# Definir o ponto de entrada (comando que será executado ao iniciar o contêiner)
CMD ["python3", "/pull-request.py"]
