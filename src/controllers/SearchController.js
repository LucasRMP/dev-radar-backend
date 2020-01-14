const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  index: async (req, res) => {
    const { techs, latitude, longitude } = req.query;
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json(devs);
  },
};
