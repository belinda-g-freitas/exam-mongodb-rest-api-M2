const userModel = require('../models/user');
const authorModel = require('../models/author');
const { validationResult, matchedData } = require('express-validator');
const { convertStringToDate } = require('../utils/methods')

const controller = {
  //
  create: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req)
    convertStringToDate(data.birthday)
    try {
      const user = await userModel.create({
        birthday: convertStringToDate(data.birthday),
        name: data.name,
        nationality: data.nationality,
      });

      if (!user) return res.status(500).json({ message: 'Error', errors: 'We couldn\'t create the author' });

      let author;
      author = await authorModel.create({
        user: user.id,
        publishedBooks: data.books
      })

      res.json({ message: 'Success', data: author});
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  },
  // 
  update: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ message: 'Error', errors: result.array() });

    const data = matchedData(req);
    try {
      let author
      if (data.name || data.birthday || data.nationality) {
        author = await userModel.updateOne({
          where: { id: data.auhor },
          data: {
            name: data.name,
            birthday: data.birthday,
            nationality: data.nationality,
          }
        })
      }
      if (data.books) {
        author = await authorModel.updateOne({
          where: { id: data.author },
          data: {
            publishedBooks: data.books,
          },
        })
      }

      res.json({ message: 'Success', data: author });
    } catch (error) {
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
      const author = await authorModel.findById(data.id)
      if (!author) res.status(422).json({ message: 'Error', errors: 'Author with this id doesn\'t exist.' });
      await author.deleteOne();

      res.json({ message: 'Success', data: author });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'An error occured.' });
    }
  }
}


module.exports = controller