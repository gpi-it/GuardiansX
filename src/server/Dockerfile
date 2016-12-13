FROM node
COPY . /src/server
COPY ../client/ /src/client
RUN cd /src/server; npm install
EXPOSE  3000
CMD ["node", "/src/server/server.js"]