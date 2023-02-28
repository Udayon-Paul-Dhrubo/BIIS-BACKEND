

// internal updates
const Location = require("../../database/models/Location");
const Tag = require("../../database/models/Tag");

// validate complaint update
const validateComplaintUpdate = async (req, res, next) => {
    const possibleUpdates = ["status", "location", "tags"];

    const updates = Object.keys(req.body);

    if (updates.length === 0) return next(createError(400, "No updates provided"));


    const isValidUpdate = updates.every(update => possibleUpdates.includes(update));

    if (!isValidUpdate) return next(createError(400, "Invalid updates provided"));


    try {
        if (updates.includes("location")) {
            const locationExists = await Location.exists({ _id: req.body.location._id });
            if (!locationExists) throw createError(400, "Invalid location provided");
        }

        if (updates.includes("tags")) {
            const tagsExists = await Tag.exists({ _id: req.body.tags.map(tag => tag._id) });
            if (!tagsExists) throw createError(400, "Invalid tags provided");
        }
    }
    catch (err) {
        next(err);
    }
}