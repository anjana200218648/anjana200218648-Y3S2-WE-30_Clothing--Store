require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cashierSchema = new mongoose.Schema({
  name: String,
  totalSales: Number,
  workingDays: Number,
});

const Cashier = mongoose.model('Cashier', cashierSchema);

// Multer Storage Setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API to Upload Excel File
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await Cashier.deleteMany(); // Clear previous records
    await Cashier.insertMany(data);
    
    res.json({ message: 'Data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to Get Cashier Data & Determine Best Performer
app.get('/cashiers', async (req, res) => {
  try {
    const cashiers = await Cashier.find().sort({ totalSales: -1 });
    const bestCashier = cashiers.length > 0 ? cashiers[0] : null;
    res.json({ cashiers, bestCashier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
