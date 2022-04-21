FROM node:15.6

WORKDIR /app/main

COPY package*.json .
RUN npm install && mv node_modules /node_modules
COPY . /app/main

CMD ["npm", "run", "dev"]
