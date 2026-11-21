import multer from 'multer'

// Use memory storage for Vercel (disk storage not supported in serverless)
const storage = multer.memoryStorage()

const upload = multer({ storage })

export default upload
