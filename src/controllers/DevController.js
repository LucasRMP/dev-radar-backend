const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  store: async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body;
    if (!github_username) {
      return res.status(400).json({ Error: 'No github user informed ' });
    }

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location,
      });
    }
    return res.json(dev);
  },
  index: async (req, res) => {
    const devs = await Dev.find();

    return res.json(devs);
  },
};
