import jwt from 'jsonwebtoken'

// Admin auth middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers
    if (!atoken) return res.json({ success: false, message: 'Not Authorized. Login Again' })
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers
    if (!dtoken) return res.json({ success: false, message: 'Not Authorized. Login Again' })
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    req.docId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// User auth middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) return res.json({ success: false, message: 'Not Authorized. Login Again' })
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { authAdmin, authDoctor, authUser }
