// This script will help identify all button and input elements that need suppressHydrationWarning
const fs = require('fs');

const filePath = 'u:/sih2k25/GradGrove/Frontend/app/components/dashboard/AdminDashboard.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Find all button and input elements that don't have suppressHydrationWarning
const buttonMatches = content.match(/<button(?![^>]*suppressHydrationWarning)[^>]*>/g) || [];
const inputMatches = content.match(/<input(?![^>]*suppressHydrationWarning)[^>]*>/g) || [];

console.log('Buttons needing suppressHydrationWarning:', buttonMatches.length);
console.log('Inputs needing suppressHydrationWarning:', inputMatches.length);

buttonMatches.forEach((match, index) => {
  console.log(`Button ${index + 1}:`, match);
});

inputMatches.forEach((match, index) => {
  console.log(`Input ${index + 1}:`, match);
});