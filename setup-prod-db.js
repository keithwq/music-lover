const { execSync } = require('child_process');

// Supabase production database
const DATABASE_URL = 'postgresql://postgres.lsmdcznexriydmbhjezo:Kxsw1234kxsw1234@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres';

console.log('Setting up production database...');

try {
  // Run migrations
  console.log('Running migrations...');
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL },
    stdio: 'inherit'
  });
  
  console.log('Migrations completed!');
  
  // Run seed
  console.log('Seeding database...');
  execSync('npx prisma db seed', {
    env: { ...process.env, DATABASE_URL },
    stdio: 'inherit'
  });
  
  console.log('Seed completed!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
