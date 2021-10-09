import mongoose from 'mongoose'

async function ConnectDatabase() {
  await mongoose.connect('mongodb://localhost:27017/tenisshop').then(() => {
    console.log('Succesfull connected to the database. 🔥')
  }).catch((err) => {
    console.log(`Failed to connect to the database, error: ${err}`)
  })
}

export default ConnectDatabase
