# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy only the package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Set environment variables
ENV HOST 0.0.0.0

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["yarn", "run", "deploy:dev"]
