# Base image
FROM node:20

# Set working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose application port
EXPOSE 3000

# Command to run the application
ENTRYPOINT [ "npm", "run", "dev" ]
