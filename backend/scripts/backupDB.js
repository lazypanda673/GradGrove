const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const backupDatabase = () => {
  const date = new Date().toISOString().split('T')[0];
  const backupPath = path.join(__dirname, '../backups', `gradgrove-backup-${date}`);
  
  let command;
  
  if (process.env.MONGODB_URI) {
    // MongoDB Atlas backup
    const uri = process.env.MONGODB_URI;
    command = `mongodump --uri="${uri}" --out="${backupPath}"`;
  } else {
    // Local MongoDB backup
    command = `mongodump --db=gradgrove --out="${backupPath}"`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Backup failed:', error);
      return;
    }
    console.log('✅ Backup completed successfully');
    console.log('📁 Backup location:', backupPath);
  });
};

backupDatabase();