FROM node:15.6

WORKDIR /app/main

COPY package*.json .
RUN npm install
COPY . /app/main

CMD ["npm", "run", "dev"]
