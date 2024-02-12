const express = require('express');

const HOME = express.Router();
module.exports = HOME;

const openDB = require('../../../data/openDB');

HOME.get('/', async (req, res) => {
    const db = await openDB();

    let apps;

    try {
        const query = `
            SELECT
                *
            FROM
                apps
            ORDER BY
                priority
        `;

        apps = await db.all(query);
    } catch (err) {
        if (err) {
            await db.close();

            res.status(500).render('error/error', { error: err });
        }
    }

    let app_active;

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
        const params = [process.env.ENABLED_VIEW];

        app_active = await db.get(query, params);
    } catch (err) {
        if (err) {
            await db.close();
            console.log(err);

            // res.status(500).render('error/error', { error: err });
        }
    }

    res.render('home/home', { apps, types: ['facebook', 'twitter'], enview: process.env.ENABLED_VIEW, app_active });
});
