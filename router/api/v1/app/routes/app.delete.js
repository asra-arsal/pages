const express = require('express');

const DELETE = express.Router();
module.exports = DELETE;

const openDB = require('../../../../../data/openDB');

DELETE.delete('/', async (req, res) => {
    const db = await openDB();

    const id = req?.body?.id ? parseInt(req?.body?.id) : null;

    // Validate user input.
    if (id === null || isNaN(id) || id <= 0) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/delete',
                moment: 'Validating user input.',
                message: 'The id you submitted is not valid. Make sure it is a number greater than zero.',
            },
        });
    }

    // Check if the id exists in the database.
    try {
        const query = `
            SELECT
                *
            FROM
                apps
            WHERE
                id = ?;
        `;
        const params = [id];

        const exists = await db.get(query, params);

        if (!exists) {
            await db.close();

            return res.status(404).json({
                success: false,
                data: null,
                error: {
                    code: 404,
                    type: 'Content not found.',
                    route: '/api/v1/app/delete',
                    moment: 'Checking to see if an app with the submitted id exist in the database.',
                    error: `An app with the id you submitted does not exist in the database.`,
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
                    route: '/api/v1/app/delete',
                    moment: 'Checking if an app with the submitted id exist in the database.',
                    message: err.toString(),
                },
            });
        }
    }

    try {
        const query = `
            DELETE
                FROM
                    apps
                WHERE
                    id = ?;
        `;
        const params = [id];

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
                    route: '/api/v1/app/delete',
                    moment: 'Deleting the app record from the database.',
                    message: err.toString(),
                },
            });
        }
    }
});
