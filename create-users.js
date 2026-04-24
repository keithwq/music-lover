const bcrypt = require('bcrypt');

async function createUsers() {
  const users = [
    { email: '1@nji.cn', password: 'nnn' },
    { email: '2@nji.cn', password: 'nnn' }
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(`User: ${user.email}`);
    console.log(`Hashed Password: ${hashedPassword}`);
    console.log('---');
  }
}

createUsers();
