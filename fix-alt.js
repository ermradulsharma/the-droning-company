const fs = require('fs');
const path = require('path');
function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'node_modules' || file === '.next' || file === 'public' || file === '.git') continue;
            walk(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('<Image') && content.includes('alt={')) {
                let newContent = content.replace(/alt=\{([^\}]+)\}/g, (match, p1) => {
                    if (p1.includes('||') || p1.includes('?') || p1.startsWith('`') || p1.startsWith('\'') || p1.startsWith('\"')) {
                        if (p1.includes('?.') && !p1.includes('||')) {
                            return 'alt={(' + p1 + ') || \'image\'}';
                        }
                        if (p1.includes('parse(') && !p1.includes('||')) {
                            return 'alt={(' + p1 + ') || \'image\'}';
                        }
                        if (p1.includes(' ? ') || p1.includes('||')) {
                            return match;
                        }
                    }
                    if (!p1.includes('||')) {
                        return 'alt={(' + p1 + ') || \'image\'}';
                    }
                    return match;
                });
                if (newContent !== content) {
                     fs.writeFileSync(fullPath, newContent);
                     console.log('Patched ' + fullPath);
                }
            }
        }
    }
}

walk(path.join(__dirname, 'components'));
walk(path.join(__dirname, 'pages'));
