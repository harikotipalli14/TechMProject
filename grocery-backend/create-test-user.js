const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Connect to the database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Create a test user
async function createTestUser() {
  try {
    // Hash the password
    const saltRounds = 10;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert the user into the database
    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      ['test@example.com', hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            console.log('Test user already exists');
          } else {
            console.error('Error creating test user:', err);
          }
        } else {
          console.log('Test user created successfully');
        }
        
        // Close the database connection
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          } else {
            console.log('Database connection closed');
          }
        });
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    db.close();
  }
}

// Run the function
createTestUser(); 