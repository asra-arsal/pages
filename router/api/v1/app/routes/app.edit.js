const express = require('express');

const EDIT = express.Router();
module.exports = EDIT;

const openDB = require('../../../../../data/openDB');

const { isValidURL } = require('../../../../../utils/utils');

EDIT.put('/', async (req, res) => {
    const db = await openDB();

    const id = req?.body?.id ? parseInt(req?.body?.id) : null;
    const name = req?.body?.name ? req?.body?.name : null;
    const link = req?.body?.link ? req?.body?.link : null;

    // Validate user input.
    if (link === null || name === link || id === null) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/edit',
                moment: 'Validating user input.',
                message: 'One of the following required items is missing from your request: id, name, or link.',
            },
        });
    }

    // Validate user id input.
    if (id === null || isNaN(id) || id <= 0) {
        await db.close();

        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 400,
                type: 'Invalid user input.',
                route: '/api/v1/app/edit',
                moment: 'Validating user input.',
                message: 'The id you submitted is not valid. Make sure it is a number greater than zero.',
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
                route: '/api/v1/app/edit',
                moment: 'Validating app link submitted by the user.',
                message:
                    "The app link you submitted is invalid. Make sure it's of the following format: http(s)://(www.)example.org",
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
                    route: '/api/v1/app/edit',
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
                    route: '/api/v1/app/edit',
                    moment: 'Checking if an app with the submitted id exist in the database.',
                    message: err.toString(),
                },
            });
        }
    }

    // Check if the name or link already exists in the database.
    try {
        const query = `
                SELECT
                    *
                FROM
                    apps
                WHERE
                    id <> ?
                    AND
                    (
                        name = ?
                        OR
                        link = ?
                    );
            `;
        const params = [id, name, link];

        const exists = await db.get(query, params);

        if (exists) {
            await db.close();

            return res.status(409).json({
                success: false,
                data: null,
                error: {
                    code: 409,
                    type: 'Duplicate content.',
                    route: '/api/v1/app/edit',
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
                    route: '/api/v1/app/edit',
                    moment: 'Checking if app name or app link already exist in the database.',
                    message: err.toString(),
                },
            });
        }
    }

    try {
        const query = `
            UPDATE
                apps
            SET
                name = ?,
                link = ?
            WHERE
                id = ?;
        `;
        const params = [name, link, id];

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
                    route: '/api/v1/app/edit',
                    moment: 'Editing the app record in the database.',
                    message: err.toString(),
                },
            });
        }
    }
});

EDIT.put('/order', async (req, res) => {
    const db = await openDB();

    const apps = req?.body?.apps ? req?.body?.apps : null;

    let errored_out = false;

    if (apps !== null) {
        for (let i = 0; i < apps.length; i++) {
            const app = apps[i];

            const query = `
                UPDATE
                    apps
                SET
                    priority = ?
                WHERE
                    id = ?;
            `;
            const params = [app.priority, app.id];

            try {
                await db.run(query, params);
            } catch (err) {
                if (err) {
                    await db.close();

                    errored_out = true;

                    break;
                }
            }
        }
    }

    if (errored_out) {
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 500,
                type: 'Internal server error.',
                route: '/api/v1/app/edit/order',
                moment: 'Updating order.',
                error: err.toString(),
            },
        });
    } else {
        return res.json({
            success: true,
            data: null,
            error: null,
        });
    }
});
