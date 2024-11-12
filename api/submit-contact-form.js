// Assuming this is the code for handling the contact form submission

const { Client } = require('pg'); // Import PostgreSQL client

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false // Use this if SSL is required
    }
};

// Define the API handler
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Check if all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const client = new Client(dbConfig);

        try {
            // Connect to the PostgreSQL database
            await client.connect();

            // Update the SQL query to insert into the Danceform table
            const query = 'INSERT INTO Danceform (name, email, message) VALUES ($1, $2, $3)';
            await client.query(query, [name, email, message]);

            // Send success response
            res.status(200).json({ message: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            // Close the connection
            await client.end();
        }
    } else {
        // Handle other request methods
        res.setHeader('Allow', ['POST']); // Inform client of allowed methods
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

// Export the handler (for serverless deployment)
module.exports = handler;
