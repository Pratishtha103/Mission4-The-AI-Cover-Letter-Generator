require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post('/generate', async (req, res) => {
    const { fullName, jobRole, companyName, skills } = req.body;

    const prompt = `
    Write a professional cover letter for ${fullName}
    applying to ${companyName} for the role of ${jobRole}
    with following key skills: ${skills}
    `;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API call failed" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});