const Game = require('../models/games');


const createGame = async (gameData, imageUrl) => {
    try {
      // Set the image URL in the game data
      const gameDataWithImage = { ...gameData, image: imageUrl };
  
      // Process and store game data in MongoDB
      const createdGame = await Game.create(gameDataWithImage);
  
      // Return the created game object
      return { message: 'Game created successfully', game: createdGame };
    } catch (error) {
      // Handle errors
      console.error('Error creating game:', error);
      throw error;
    }
  };
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find()
        return res.status(200).json({ games })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id)
        if (game) {
            return res.status(200).json({ game });
        }
        return res.status(404).send('Game with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json(game)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Game.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Game deleted");
        }
        throw new Error("Game not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame
}