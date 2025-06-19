const fs = require('fs');

// Create placeholder images for different categories
const categories = {
  portraits: [
    { name: 'portrait1.svg', width: 400, height: 600, color: '#D4C5B9' },
    { name: 'portrait2.svg', width: 400, height: 400, color: '#C7B299' },
    { name: 'portrait3.svg', width: 400, height: 600, color: '#B5A081' }
  ],
  events: [
    { name: 'event1.svg', width: 600, height: 400, color: '#E8DDD4' },
    { name: 'event2.svg', width: 400, height: 400, color: '#DDD0C0' },
    { name: 'event3.svg', width: 600, height: 400, color: '#D0C0B0' }
  ],
  farms: [
    { name: 'farm1.svg', width: 600, height: 400, color: '#C5B5A0' },
    { name: 'farm2.svg', width: 400, height: 600, color: '#B8A990' },
    { name: 'farm3.svg', width: 600, height: 400, color: '#A89080' }
  ],
  portfolio: [
    { name: 'portfolio1.svg', width: 400, height: 400, color: '#E5DAD1' },
    { name: 'portfolio2.svg', width: 400, height: 600, color: '#D8CCC0' },
    { name: 'portfolio3.svg', width: 600, height: 400, color: '#CBBEB0' },
    { name: 'portfolio4.svg', width: 400, height: 400, color: '#BEB1A0' },
    { name: 'portfolio5.svg', width: 400, height: 600, color: '#B1A490' },
    { name: 'portfolio6.svg', width: 600, height: 400, color: '#A49780' },
    { name: 'portfolio7.svg', width: 400, height: 400, color: '#978A70' },
    { name: 'portfolio8.svg', width: 400, height: 600, color: '#8A7D60' },
    { name: 'portfolio9.svg', width: 600, height: 400, color: '#7D7050' }
  ]
};

function createPlaceholderSVG(width, height, color, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
          text-anchor="middle" dominant-baseline="middle" fill="#333">
      ${text}
    </text>
  </svg>`;
}

// Generate all placeholder images
Object.keys(categories).forEach(category => {
  const categoryPath = `public/photos/${category}`;
  
  categories[category].forEach(image => {
    const svg = createPlaceholderSVG(
      image.width, 
      image.height, 
      image.color, 
      `${category.toUpperCase()} ${image.width}x${image.height}`
    );
    
    fs.writeFileSync(`${categoryPath}/${image.name}`, svg);
    console.log(`Created ${categoryPath}/${image.name}`);
  });
});

console.log('All placeholder images created successfully!'); 