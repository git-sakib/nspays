# nspays coding
_An experimental module for nspays_

## Installation

nspays requires [Node.js](https://nodejs.org/) at v14+ to run.

Install all the dependencies
```sh
npm install
```

## Running the codes

Run with the command below, with an argument containing a local file path or input json URL

```sh
node app.js input.json
node app.js "http://www.example.com/input.json"
node app.js LOCAL_FILE_PATH
```

#### ESLint Validation
Run the command below to find any issues comparing with AirBnB Standards
```sh
npm run check
```

#### Jest Test Cases
Run the command below to run all unit and functional testcases
```sh
npm test
```
