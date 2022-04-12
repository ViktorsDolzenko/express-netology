FROM node:15.6

WORKDIR /app/counter

COPY package*.json .
RUN npm install
COPY . /app/counter

CMD ["npm", "start"]
