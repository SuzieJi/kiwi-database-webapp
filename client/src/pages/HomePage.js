
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '@fontsource/dancing-script';

const categories = [
  { name: 'Chinese', image: '/images/chinese_food.jpg' },
  { name: 'French', image: '/images/French_food.jpg' },
  { name: 'Italian', image: '/images/Italian_food.jpg' },
  { name: 'Mexican', image: '/images/Mexican_food.jpg' },
  { name: 'Thai', image: '/images/Thai_food.jpg' },
  { name: 'American', image: '/images/American_food.jpg' },
  { name: 'Korean', image: '/images/Korean_food.jpg' },
];

const landmarks = [
  { name: 'Statue of Liberty', image: '/images/landmark/statue_of_liberty.jpg', url: 'https://www.nps.gov/stli/index.htm' },
  { name: 'Central Park', image: '/images/landmark/central_park.jpg', url: 'https://www.centralparknyc.org/' },
  { name: 'Broadway', image: '/images/landmark/broadway.jpg', url: 'https://www.nyc.com/broadway_tickets/?gad_source=1&gclid=CjwKCAjwz42xBhB9EiwA48pT78K3-n8DFODQ321rGyPmqHpMDFjqItdnGbM9slpT4wOxtxNGCAZ0URoCWAIQAvD_BwE' },
  { name: 'Brooklyn Bridge', image: '/images/landmark/brooklyn_bridge.jpg', url: 'https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml' },
  { name: 'Coney Island', image: '/images/landmark/coney_island.jpg', url: 'https://www.coneyisland.com/' },
  { name: 'Empire State Building', image: '/images/landmark/empire_state_building.jpg', url: 'https://www.esbnyc.com/' },
  { name: 'Grand Central Terminal', image: '/images/landmark/grand_central_terminal.jpg', url: 'https://grandcentralterminal.com/' },
  { name: 'High Line', image: '/images/landmark/high_line.jpg', url: 'https://www.thehighline.org/' },
  { name: 'One World Trade Center', image: '/images/landmark/one_world_trade_center.jpg', url: 'https://www.wtc.com/about/buildings/1-world-trade-center' },
  { name: 'Stone Street', image: '/images/landmark/stone_street.jpg', url: 'https://www.stonestreetnyc.com/' },
  { name: 'The Met', image: '/images/landmark/the_met.jpg', url: 'https://www.metmuseum.org/' },
  { name: 'Time Square', image: '/images/landmark/time_square.jpg', url: 'https://www.timessquarenyc.org/' },
  { name: 'Wall Street', image: '/images/landmark/wall_street.jpg', url: 'https://www.nyse.com/index' }
];

function HomePage() {
  const navigate = useNavigate();

  const handleCardClick = (cuisine) => {
    navigate(`/restaurants/${cuisine.toLowerCase()}`);
  }

  const handleLandmarkCardClick = (url) => {
    window.open(url, '_blank');
  }

  return (
    <Box sx={{ m: 12 }}> 
      <Typography variant="h4" gutterBottom textAlign="center">Welcome to New York City!</Typography>
      <Typography variant="h6" paragraph sx={{ textIndent: '2em', textAlign: 'justify' }}>
      Welcome to New York City (NYC), a bustling metropolis that stands as one of the world's leading cultural, financial, and entertainment capitals. Known as "The Big Apple," NYC is famous for its iconic landmarks, diverse neighborhoods, and vibrant energy that pulses through its streets at all hours.
      </Typography>
      <Typography variant="h6" paragraph sx={{ textIndent: '2em', textAlign: 'justify' }}>
      As you explore the city, you'll encounter its five distinct boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, each offering its unique charm and attractions. Manhattan, the heart of the city, is home to world-renowned sites such as Times Square, Central Park, and the Empire State Building. Its skyline, dominated by towering skyscrapers, is a testament to the city's architectural prowess and dynamic history.

Brooklyn, with its artistic vibe and cultural diversity, offers a more relaxed atmosphere with trendy shops, eclectic restaurants, and picturesque parks, including the famous Brooklyn Bridge Park. Queens, celebrated for its culinary scene, boasts an array of international cuisines reflecting its rich multicultural heritage.

The Bronx, known as the birthplace of hip hop, offers cultural gems like the Bronx Zoo and the New York Botanical Garden, while Staten Island provides a serene getaway with its green spaces, museums, and the historic Staten Island Ferry.

NYC is not just about its famous landmarks; it's a city of experiences. Take in a Broadway show, explore the vast collections of the Metropolitan Museum of Art or the Museum of Modern Art (MoMA), or catch a game at Yankee Stadium or Madison Square Garden. From the luxury shops on Fifth Avenue to the bustling markets in Chinatown and the bohemian streets of Greenwich Village, New York City offers endless opportunities to explore and immerse yourself in its unique urban tapestry.

Whether you're visiting for the first time or returning to discover more, New York City welcomes you with open arms and promises an adventure that you will never forget. So, pack your bags, bring your energy, and get ready to explore the city that never sleeps!
      </Typography>

      
      <Typography variant="h4" gutterBottom sx={{ m: 5, fontWeight: 'bold'}}>Discover Local Cuisine</Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.name}>
            <Card sx={{ borderRadius: 3, position: 'relative'}}>
              <CardActionArea onClick={() => handleCardClick(category.name)}>
                <CardMedia
                  component="img"
                  height="300" 
                  image={category.image}
                  alt={category.name}
                />
                <CardContent sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '8px', 
                  color: 'white', 
                  fontFamily: 'cursive', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '38px', 
                }}>
                  <Typography variant="h6" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ m: 5, fontWeight: 'bold'}}>Discover Local Landmarks</Typography>
      <Grid container spacing={4}>
        {landmarks.map((landmark) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={landmark.name}>
            <Card sx={{ borderRadius: 3, position: 'relative' }}>
              <CardActionArea onClick={() => handleLandmarkCardClick(landmark.url)}>
                <CardMedia
                  component="img"
                  height="300"
                  image={landmark.image}
                  alt={landmark.name}
                />
                <CardContent sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '8px', 
                  color: 'white', 
                  fontFamily: 'cursive', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '38px', 
                }}>
                  <Typography variant="h6" component="div">
                    {landmark.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;