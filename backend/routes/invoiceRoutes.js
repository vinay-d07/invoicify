const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const User = require('../models/User');
const authMiddleware = require('../middlwares/Auth');

// Create invoice (authenticated)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const {
            invoiceNumber,
            invoiceDate,
            dueDate,
            client,
            items,
            subTotal,
            taxTotal,
            discount,
            total,
            currency,
            notes,
            terms,
            paymentDetails,
            status,
        } = req.body;


        const newInvoice = new Invoice({
            invoiceNumber,
            invoiceDate,
            dueDate,
            client,
            items,
            subTotal,
            taxTotal,
            discount,
            total,
            currency,
            notes,
            terms,
            paymentDetails,
            status,
            createdBy: req.user._id,
        });
        // add reference to user's invoicesCreated array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { invoicesCreated: newInvoice._id },
        });
        await newInvoice.save();

        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

// List invoices for authenticated user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const invs = await Invoice.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(invs);
    } catch (error) {
        console.error('Error listing invoices:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const inv = await Invoice.findById(req.params.id);
        if (!inv) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(inv);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;