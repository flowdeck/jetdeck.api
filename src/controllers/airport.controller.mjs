import User from '../models/user.model.mjs'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'

// Load environment variables
dotenv.config()

const airportController = {}

airportController.getAirports = async (req, res) => {
  try {
    //get all airports from airports collection
    const airports = await Airport.find({})

    //handle error if no airports found
    if (!airports) {
      throw {
        status: 404,
        message: 'No airports found',
      }
    } else if (airports instanceof Error) {
      throw {
        status: 500,
        message: airports.message,
      }
    } else {
      res.status(200).json(airports)
    }
  } catch (errObj) {
    const errResp = handleErrorObj(errObj)
    console.log(errResp)
    res.status(500).json(errResp)
  }
}

export default airportController
