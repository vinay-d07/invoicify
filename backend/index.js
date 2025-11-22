const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
dotenv.config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  'origin':['http://localhost:5173', process.env.FRONTEND_URL || '']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {  
  res.send('API is running....');
});


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

;(async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
