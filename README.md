# Amp HTML Validation Service

Google AMP validation and alerting as a service.

## Run Modes

There are two ways in which you can specify pages to validate and alerts to send. Both modes use the same configuration.

### GET (Config Based)

```bash
curl localhost
```

With an http GET request to the root URL, the service parses a pre-configured config.ts file that lives in the src directory, and validates pages/sends alerts as defined in that config file.

This path would be useful for something like an amp validation smoke test.

### POST (Request Based)

```bash
curl -H "Content-Type: application/json" -d @example.json localhost
```

With an HTTP POST request to the root URL, the service uses the data POSTed to the URL as the configuration for pages to validate/alerts to send.

This path would be useful for something like a post publish web hook, which validates content whenever it is published.

## Config

### Pages
An array of urls to validate. Here is an example:
```javascript
export var alerts = [];

export var pages = [
    "https://www.site.com/amp/article1",
    "https://www.site.com/amp/article2",
    "https://www.site.com/amp/article3"
];
```

### Alerts
An array of alerts. This section of the config specifies what to alert and how if the validator finds an issue. 
For more information on configuring for specific alert types and a full example, see [this folder](docs/alerts)

#### Type (required)
The type of the alert. This corresponds to any alert type, which can be found as individual modules in the src/alerts folder.

#### URL (required)
The url to send the alert to.

#### Example

```javascript
export var alerts = [
    {
        "type": "slack",
        "url": "https://hooks.slack.com/services/blahblahblahblahblah"
    },
    {
        "type": "slack",
        "url": "https://hooks.slack.com/services/blahblahblahblahblah2"
    }
];

export var pages = [];
```

## Local Development

* Install Docker and docker-compose
* Create a config.ts in the src directory
* Run `docker-compose run validator npm run tsc`
* Run `docker-compose up`