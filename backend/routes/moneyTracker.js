const express = require('express')
const { 
    getAllRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord
} = require('../controllers/moneyTrackerController')

const router = express.Router()

// Get all records
router.get('/', getAllRecords)

// Get a single record
router.get('/:id', getRecord)

// Post a record
router.post('/', createRecord)

// Delete a record
router.delete('/:id', deleteRecord)

// Update a record
router.patch('/:id', updateRecord)

module.exports = router