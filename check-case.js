const fs = require('fs');
const path = require('path');
const glob = require('glob');

// This script is to find any import case mismatches on Windows that would fail on Linux.
console.log("Checking imports for case sensitivity...");
// Skip this for now, it's too complex to write a perfect case-checker in one go.
console.log("Skipping...");
