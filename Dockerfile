FROM node:16.15-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json .
RUN npm install
# RUN npm i bootstrap@4.6.2 font-awesome@4.7.0 react-router-dom@5.3.3 query-string@6.1.0 joi-browser@13.4 lodash@4.17.21 prop-types@15.6.2
COPY . .
# RUN npm start
EXPOSE 3000
CMD ["npm", "start"]