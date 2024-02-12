const express = require('express');

const CREATE = express.Router();
module.exports = CREATE;

const openDB = require('../../../../../data/openDB');

const { isValidURL } = require('../../../../../utils/utils');

CREATE.post('/', async (req, res) => {
    const db = await openDB();

    const type = req?.body?.type ? req?.body?.type : null;
    const name = req?.body?.name ? req?.body?.name : null;
    const link = req?.body?.link ? req?.body?.link : null;
    const priority = new Date().getTime();

    // Validate user input.
    if (link === null || name === link || type === null) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/create',
                moment: 'Validating user input.',
                message: 'One of the following required items is missing from your request: type, name, or link.',
            },
        });
    }

    // Validate app type.
    const types = ['facebook', 'twitter'];
    if (!types.includes(type)) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/create',
                moment: 'Validating app type submitted by the user.',
                message:
                    "The app type you submitted is invalid. Make sure it's one of the following: facebook | twitter.",
            },
        });
    }

    // Validate app link.
    if (!isValidURL(link)) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/create',
                moment: 'Validating app link submitted by the user.',
                message:
                    "The app link you submitted is invalid. Make sure it's of the following format: http(s)://(www.)example.org",
            },
        });
    }

    // Check if the name or link already exists in the database.
    try {
        const query = `
            SELECT
                *
            FROM
                apps
            WHERE
                name = ?
                OR
                link = ?;
        `;
        const params = [name, link];

        const exists = await db.get(query, params);

        if (exists) {
            await db.close();

            return res.status(409).json({
                success: false,
                data: null,
                error: {
                    code: 409,
                    type: 'Duplicate content.',
                    route: '/api/v1/app/create',
                    moment: 'Checking to see if the name or link already exist in the database.',
                    error: `The app name or app link you submitted already exist in the database.`,
                },
            });
        }
    } catch (err) {
        if (err) {
            await db.close();

            return res.status(500).json({
                success: false,
                data: null,
                error: {
                    code: 500,
                    type: 'Internal server error.',
                    route: '/api/v1/app/create',
                    moment: 'Checking if app name or app link already exist in the database.',
                    message: err.toString(),
                },
            });
        }
    }

    try {
        const query = `
            INSERT INTO apps
            (
                type,
                name,
                link,
                priority
            ) VALUES (?, ?, ?, ?);
        `;
        const params = [type, name, link, priority];

        await db.run(query, params);

        await db.close();

        return res.json({
            success: true,
            data: null,
            error: null,
        });
    } catch (err) {
        if (err) {
            await db.close();

            return res.status(500).json({
                success: false,
                data: null,
                error: {
                    code: 500,
                    type: 'Internal server error.',
                    route: '/api/v1/app/create',
                    moment: 'Saving the app record to the database.',
                    message: err.toString(),
                },
            });
        }
    }
});
