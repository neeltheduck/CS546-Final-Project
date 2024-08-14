import express from express;
import {Router} from express;

import { addRating, getRatingsByTool, getRatingsByUser } from '../data/ratings.js';

router
    .route('/ratings')
    .post(async (req, res) => {
        try {
            let rating = await addRating(req.body); // req.body.something i think
            res.status().json(rating);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })


router
    .route('/ratings/tool/:toolID')
    .get(async (req, res) => {
        try {
            let toolParameter = req.params.toolID;
            let ratings = await getRatingsByTool(toolParameter);
            // not sure what to do here, maybe req.json(ratings)
        }
        catch (error) {
            res.status(500).json({error: error.message})
        }
    })

export default router;