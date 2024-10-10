# Dockerfile
FROM alpine:latest

# Update and install dependencies
RUN apk update && apk --no-cache add python3 py3-pip git bash && \
    pip3 install requests

# Copy script to the container
COPY pull-request.py /pull-request.py

# Set default command
CMD ["python3", "/pull-request.py"]
