FROM node:latest as node
WORKDIR /app

COPY . .

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

CMD ["npm", "start"]