const MoneyTracker = require('../models/MoneyTrackerModel')
const mongoose = require('mongoose')

// Get all records
const getAllRecords = async (req, res) => {
    const records = await MoneyTracker.find({}).sort({ date: -1 })
    res.status(200).json(records)
}

// Get a single record
const getRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record' })
    }
    const record = await MoneyTracker.findById(id)
    if (!record) {
        return res.status(404).json({ error: 'No such record' })
    }
    res.status(200).json(record)
}

// Post a record
const createRecord = async (req, res) => {
    const { type, category, description, amount, dateTime } = req.body
    const combinedDateTime = new Date(dateTime);
    let emptyFields = []
    if (!(type === 1 || type === 0)) {
        emptyFields.push('type')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!dateTime) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const mt = await MoneyTracker.create({ type, category, description, amount, date: combinedDateTime })
        res.status(200).json(mt)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a record
const deleteRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record' })
    }
    const record = await MoneyTracker.findOneAndDelete({ _id: id })
    if (!record) {
        return res.status(404).json({ error: 'No such record' })
    }
    res.status(200).json(record)
}

// Update a record
const updateRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record' })
    }
    const record = await MoneyTracker.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!record) {
        return res.status(404).json({ error: 'No such record' })
    }
    res.status(200).json(record)
}

module.exports = {
    getAllRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord
}