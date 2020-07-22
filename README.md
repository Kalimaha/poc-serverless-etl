[![Netlify Status](https://api.netlify.com/api/v1/badges/1626e990-261b-4d75-9b78-a1331ecbd821/deploy-status)](https://app.netlify.com/sites/poc-serverless-etl/deploys)

# POC: Serverless ETL - Bulk

## Zapier

* Zap: https://zapier.com/app/zaps
* Zapier AWS user: https://console.aws.amazon.com/iam/home?region=ap-southeast-2#/users/poc-serverless-etl-zapier
* Netlify AWS user: https://console.aws.amazon.com/iam/home?region=ap-southeast-2#/users/poc-serverless-etl-netlify
* SNS Topic: https://ap-southeast-2.console.aws.amazon.com/sns/v3/home?region=ap-southeast-2#/topic/arn:aws:sns:ap-southeast-2:595545180516:poc-serverless-etl
  * How to confirm subscription: SNS will push a message containing a confirmation URL. Grab such URL from the Netlify logs and open it in a browser.
* S3 Bucket: https://s3.console.aws.amazon.com/s3/buckets/poc-serverless-etl/?region=ap-southeast-2&tab=overview

## Netlify Function

* Endpoint: https://poc-serverless-etl.netlify.app/.netlify/functions/stock-great-wines
* Logs: https://app.netlify.com/sites/poc-serverless-etl/functions/stock-great-wines
* Guide to Netlify + S3: https://www.dferber.de/how-to-write-files-to-aws-s3-from-netlify-functions/

## Netlify Dev

* **Install CLI:** `npm install netlify-cli -g`
* **Init CLI:** `netlify init`
* **List functions:** `netlify functions:list`
* **Invoke function**
  * Run `netlify dev` in a separate tab, then
    * `netlify functions:invoke stock-great-wines --identity`, or
    * `curl -X POST "http://localhost:8888/.netlify/functions/stock-great-wines" -d "{'spam': 'eggs'}"`

## Mock upstream server

Data source is available as mock at https://geobricks.stoplight.io/mocks/geobricks/poc-serverless-etl/563013/wines. The schema for the response is defined at `./upstrams/wines.yml`.
