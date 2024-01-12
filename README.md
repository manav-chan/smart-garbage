# Smart Garbage Bin

## Set up

Change directory to WebApp and with npm installed, run the following command:
```console
npm install
```
It will install all the dependencies to your local system, then run:
```console
node app.js
```
Web server will run on localhost:3000.

## Testing

In real-time, you can change the data inside the data.txt file, which in a real world scenario will be written by the Arduino. The change will be reflected on the website, and if the level of the garbage is more than 70%, it will send an email on the account specified on the website.
