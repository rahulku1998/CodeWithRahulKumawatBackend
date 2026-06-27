const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db');

dotenv.config();
connectDB();

const app=express();
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      "https://code-with-rahul-kumawat-fronted.vercel.app",
      "https://www.codewithrahulkumawat.com",
      "https://codewithrahulkumawat.com",
    ];
    // ✅ No origin = direct browser/curl/crawler request — allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json());

const PORT=process.env.PORT || 5000;
app.use('/api/blogs', require('./routes/Blog'));
app.use('/api/courses', require('./routes/Course'));
app.use('/api/freelance', require('./routes/Freelance'));
app.use('/api/faangqs', require('./routes/FaangQ'));
app.use('/api/notes', require('./routes/Notes'));
app.use('/api/contact', require('./routes/Contact'));
app.use('/api/register',require('./routes/Register'))
app.use('/api/login',require('./routes/Login'))
app.use('/api/forgot-password',require('./routes/ForgetPass'))
app.use('/api/reset-password',require('./routes/ResetPassword'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});