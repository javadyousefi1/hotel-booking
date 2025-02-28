import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\x1b[32mServer running on http://localhost:${PORT} 🚀\x1b[0m`);
});
