

  module.exports.checkRole =  (req, res, next) => {
    try {
      const role =  req.Role
      if (role == 0) {
        next()
      } else {
        res.json("You must have permission admin to view this page")
      }
    } catch (e) {
      res.json(e)
    }
  }

