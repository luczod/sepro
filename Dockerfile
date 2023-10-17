# puxar uma imgem de base, no caso o node
# cada linha é uma camada
#  docker build -t next_img .
FROM node
# path da aplicacao
WORKDIR /app
# copy to . ou /app
COPY package*.json .
# rodar o npm install e executar o package json
RUN npm install
# copia tudo para meu container
COPY . .
# escolher a porta do container
# tem que esta igual da aplciacao
EXPOSE 3000
# o comando que executa o meu app
# exatamente o que digitaria no meu terminal
CMD ["npm", "start"]