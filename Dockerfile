FROM node

LABEL Name=plendify.client Version=0.0.1 Author="Joseph Maclean Arhin"

COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build
EXPOSE 3000




ENTRYPOINT [ "yarn", "start" ]
# CMD [ "npm", "start" ]
