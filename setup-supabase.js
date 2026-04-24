const { execSync } = require('child_process');

const DATABASE_URL = 'postgresql://postgres.lsmdcznexriydmbhjezo:Kxsw1234kxsw1234@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres';

console.log('Starting database setup...');

try {
  // Run migrations
  console.log('Running migrations...');
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL },
    stdio: 'inherit'
  });
  
  console.log('Migrations completed!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
