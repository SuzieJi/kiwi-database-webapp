const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const session = require('express-session');

const app = express();
app.use(cors({
origin: ['http://localhost:3000'],
}));

app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
  }));

app.get('/users', routes.getUsers);
app.post('/register', routes.userRegistration);
app.get('/parkinglot', routes.getParkingLots);
app.get('/restaurants/:cuisine', routes.getRestaurantsByCuisine);
app.get('/michelin/filter', routes.getMichelinByFilters);
app.get('/michelin', routes.getMichelin);
app.post('/login', routes.userLogin);
app.get('/restaurant-details/:id', routes.getRestaurantDetails);
app.get('/parkinglots/nearby', routes.getParkingLotsNearby);
app.get('/hotels/top-by-value-score', routes.getTopTenHotelsByValueScore);
app.get('/hotels/top-by-review-density', routes.getTopTenHotelsByReviewDensity);
app.get('/hotels/top-by-high-reviews', routes.getTopTenHotelsByHighReviews);

const PORT = process.env.PORT || config.server_port;
app.listen(PORT, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
