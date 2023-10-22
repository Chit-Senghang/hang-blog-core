FROM node:16-alpine
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./
RUN npm install --prefer-offline --frozen-lockfile --non-interactive

# Copy the rest of the application code
COPY . .

RUN npm run build

ENV HOST 0.0.0.0

EXPOSE 80
CMD ["npm", "run", "deploy:dev"]
