FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de package
COPY package*.json ./

# Instalar dependências (usando install em vez de ci)
RUN npm install --only=production

# Copiar código fonte
COPY . .

EXPOSE 3000

# Usar node diretamente
CMD ["node", "server.js"]
