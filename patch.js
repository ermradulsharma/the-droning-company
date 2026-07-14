const fs = require('fs');

const files = [
    'pages/blog/Fravel-s-Footnote/video-review.jsx',
    'pages/company-directory/index.js',
    'pages/company-directory/[locationCity].js',
    'pages/event/[slug].js',
    'pages/home-new.js',
    'pages/job/[jobId]/[jobSlug].js',
    'pages/job-list/index.js',
    'pages/our-team/[memberName].js',
    'pages/verify-email/[tokenId].js',
    'components/Event/UpcomingEvents.js',
    'components/Home/FeaturePilot.js',
    'components/Home/NewSection.js',
    'components/Navigation/Header/Header.js',
    'components/Navigation/SideNavMenuDrawer/SideNavMenuDrawer.js'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content.replace(/<Link(?![^>]*legacyBehavior)([^>]*)>(\s*<a)/gi, '<Link legacyBehavior$1>$2');
        if (newContent !== content) {
            fs.writeFileSync(file, newContent);
            console.log('Patched ' + file);
        }
    }
});
