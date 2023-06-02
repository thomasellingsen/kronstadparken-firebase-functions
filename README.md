# prerequisites

Install firebase CLI
npm install -g firebase-tools

# initialize

firebase init

# log in

firebase login

choose

existing project and either Kronstadparken dev or prod

# deployment

firebase functions:config:set izy.base_url="https://api.i-staging.net/public/api/v1/" izy.email="#######" izy.password="####" izy.key="######"

and then

firebase deploy --only functions

and then

firebase use

to switch between deploying to default (dev) and prod
