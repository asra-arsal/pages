const express = require('express');

const GET = express.Router();
module.exports = GET;

const openDB = require('../../../../../data/openDB');

GET.get('/:type', async (req, res) => {
    const db = await openDB();

    const types = ['facebook', 'twitter'];
    const type = req.params.type;

    if (!types.includes(type)) {
        await db.close();

        return res.status(404).json({
            success: false,
            data: null,
            error: {
                code: 404,
                type: 'Content not found.',
                route: `/api/v1/app/get/${type}`,
                moment: 'Checking if the type is valid.',
                error: 'The type you submitted was invalid. Try one of the following: facebook | twitter.',
            },
        });
    }

    try {
        const query = `
            SELECT
                *
            FROM
                apps
            WHERE
                type = ?
            ORDER BY
                priority;
        `;
        const params = [type];

        const apps = await db.all(query, params);

        await db.close();

        return res.json({
            success: true,
            data: {
                apps,
            },
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
                    route: `/api/v1/app/get/${type}`,
                    moment: 'Retreiving records from the database.',
                    error: err.toString(),
                },
            });
        }
    }
});
