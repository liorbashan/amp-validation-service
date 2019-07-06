# amp-validation-service

amp-validation-service is a service for validating HTML strings based on routing-controllers + express and amphtml-validator.

## Installation

Install

```bash
npm install
```

## Debug

Also attached .vscode folder with a launch & tasks configuration for easy debugging

## Usage

Send a post request:

```javascript
{
	"url":"https://www.imdb.com"
}
```

Expect a JSON response:

```javascript
{
    "checked": true,
    "error": "",
    "status": 200,
    "valid": true
}
```

# Bulk Requests

Request:

```javascript
[
    {
        url: 'https://www.imdb.co',
    },
    {
        url: 'https://www.cnn.com',
    },
    {
        url: 'https://www.foobar.com',
    },
];
```

Response:

```javascript

"https://www.imdb.com": {
    "checked": true,
    "error": "",
    "status": 200,
    "valid": true
},
"https://www.cnn.com": {
    "checked": true,
    "error": "",
    "status": 200,
    "valid": true
},
"https://www.foobar.com": {
    "checked": true,
    "error": "",
    "status": 200,
    "valid": true
}

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
