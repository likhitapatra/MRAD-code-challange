import AWS from 'aws-sdk';
import axios from 'axios';
import json2csv from 'json2csv';

const s3 = new AWS.S3();

export const stationsHandler = async (event, context) => {
  try {
    const response = await axios.get(
      'https://gbfs.divvybikes.com/gbfs/en/station_information.json'
    );
    // No legacy_id in the response to rename
    const rawData = response.data.data.stations;

    const filteredAndTransformedData = rawData
      .map(
        ({
          external_id: externalId,
          station_id: stationId,
          rental_uris,
          rental_methods,
          ...rest
        }) => ({
          externalId,
          stationId,
          ...rest,
        })
      )
      .filter((station) => Object.keys(station).length <= 12);

    const csv = json2csv.parse(filteredAndTransformedData);

    const s3Params = {
      Bucket: process.env.BUCKET || 'stations-csv-bucket',
      Key: 'stations.csv',
      Body: csv,
    };

    await s3.upload(s3Params).promise();

    return filteredAndTransformedData;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching and processing data' }),
    };
  }
};

export const handler = stationsHandler;
