const Tour = require("../models/tour")


module.exports = async (req, res, next) => {
    if (!req.params.tId || !await Tour.exists({ "_id": req.params.tId }))
      return res.status(404).json({ status: "fail", message: "Tour not found" });
    next();
};

