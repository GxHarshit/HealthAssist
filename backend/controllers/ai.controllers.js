import * as aiService from '../services/promptai.secrvices.js';

export const getResult = async (req, res) => {
    try {
         const { prompt } = req.query || {}; // Ensure req.query exists
  if (!prompt) {
    return res.status(400).send({ error: 'Prompt is required' });
  }
        console.log(prompt);
        const result = await aiService.generateResult(prompt);
        res.status(200).send({result});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}