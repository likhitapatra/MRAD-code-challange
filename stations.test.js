import axios from 'axios';
import json2csv from 'json2csv';
import AWS from 'aws-sdk';
import { stationsHandler } from './stations';

jest.mock('axios');
jest.mock('json2csv');
jest.mock('aws-sdk');

describe('stationsHandler', () => {
    it('should handle the request and upload data to S3', async () => {
        const axiosResponse = {
            data: {
                data: {
                    stations: [
                        {
                            "station_type": "classic",
                            "short_name": "TA1309000003"
                        }
                    ],
                },
            },
        };
        axios.get.mockResolvedValue(axiosResponse);
        json2csv.parse.mockReturnValue('CSV Data');

        AWS.S3.prototype.upload.mockImplementation((params) => {
            if (params.Body === 'CSV Data') {
                return {
                    promise: jest.fn().mockResolvedValue(),
                };
            }
            throw new Error('Invalid S3 upload params');
        });

        const event = {};
        const context = {};

        const result = await stationsHandler(event, context);

        expect(axios.get).toHaveBeenCalledWith(
            'https://gbfs.divvybikes.com/gbfs/en/station_information.json'
        );
        expect(json2csv.parse).toHaveBeenCalledWith(expect.any(Array));
        expect(AWS.S3.prototype.upload).toHaveBeenCalledWith({
            Bucket: 'stations-csv-bucket',
            Key: 'stations.csv',
            Body: 'CSV Data',
        });
    });

    it('should handle errors and return a 500 response', async () => {
        axios.get.mockRejectedValue(new Error('Mocked error'));

        const event = {};
        const context = {};
        const result = await stationsHandler(event, context);

        expect(result.statusCode).toBe(500);
        expect(result.body).toBe('{\"message\":\"Error fetching and processing data\"}');
    });
});
