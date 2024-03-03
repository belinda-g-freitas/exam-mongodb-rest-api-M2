const bookModel = require('../models/book');
const { validationResult, matchedData } = require('express-validator');

const controller = {
  //
  create: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req)

    try {
      const book = await bookModel.create({
        title: data.title,
        authors: data.author,
        description: data.description,
        genres: data.genres,
        publishYear: data.publish_year,
        availableQuantity: data.available_quantity,
      })

      res.json({ message: 'Success', data: book });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  //
  getByGenre: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      const books = await bookModel.find({ genres: data.genre });

      res.json({ message: 'Success', data: books });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  // update: async (req, res) => {
  //   const data = matchedData(req);
  //   const book = await bookModel.findById(data.id);
  //   await book.updateOne({ $set: { publishYear: data.date } })

  //   res.json({ message: 'Success', data: book });
  // },
  //
  getByAuthor: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      const books = await bookModel.find({ authors: data.author });

      res.json({ message: 'Success', data: books });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  search: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req)

    try {
      const books = await prisma.book.findMany({ where: { title: data.search } })
      res.json({ message: 'Success', data: books });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  delete: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req)
    try {
      const book = await bookModel.findOne({ user: data.id })
      if (!book) res.status(422).json({ message: 'Error', errors: 'Book with this id doesn\'t exist.' });
      await book.deleteOne();

      res.json({ message: 'Success', data: book });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },

}


module.exports = controller