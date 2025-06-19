const mysql = require('mysql')
const config = require('./config.json')


// Creates MySQL connection using database credential provided in config.json
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const userRegistration = async function(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  //const hashedPassword = await bcrypt.hash(password, 10); 

  connection.query(`
    INSERT INTO User (username, password) VALUES (?, ?)`,
    [username, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(result)
          res.status(400).send('Username already exists');
        } else {
          console.error("Error: ", err);
          console.log(result)
          res.status(500).send('Error registering user');
        }
      } else {
        console.log(result)
        res.status(201).send('User registered successfully! Please log in.');
      }
  });
}

const userLogin = async function(req, res) {
  const { username, password } = req.body;

  connection.query(`SELECT * FROM User WHERE username = ?`,
    [username],
    (err, result) => {
      if (err) {
        res.status(500).send('Error during login attempt');
      } else if (result.length > 0) {
        const user = result[0];

        const isPasswordCorrect = (password === user.password);

        if (isPasswordCorrect) {
          req.session.user = {id: user.id, username: user.username};
          res.status(200).json({ message: 'User logged in successfully', user: req.session.user });
        } else {
          res.status(400).send('Username or password incorrect');
        }
      } else {
        res.status(400).send('Username or password incorrect');
      }
    }
  );
};

const getUsers = async function(req, res) {
  connection.query(`
    SELECT * 
    FROM User
    `, (err, result) => {
    if (err || result.length === 0) {
      res.status(400).send('Error');
    } else {
      console.log(result)
      res.json(result);
    }
  });
}

const getParkingLots = async function(req, res) {
  connection.query(`
    SELECT *
    FROM Parkinglot
  `, (err, result) => {
    if (err) {
      res.status(500).send('Error during fetching parking lot data');
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No parking lot data found');
    }
  });
}

const getRestaurantsByCuisine = async function(req, res) {
  const { cuisine } = req.params;
  console.log(`Fetching data for cuisine: ${cuisine}`);

  connection.query(`
    SELECT *
    FROM Restaurant
    WHERE LOWER(cuisine) = LOWER(?)
  `, [cuisine], (err, result) => {
    if (err) {
      console.error('Error fetching restaurant data:', err);
      res.status(500).send('Error fetching restaurant data');
    } else if (result.length > 0) {
      console.log(`Found ${result.length} restaurants`);
      res.status(200).json(result);
    } else {
      console.log('No restaurants found for this cuisine');
      res.status(404).send('No restaurants found for this cuisine');
    }
  });
}

const getMichelinByFilters = async function(req, res) {
  const {cuisine, price, star} = req.query;
  let filterQuery = `SELECT * FROM Michelin WHERE 1 = 1`;

  if (cuisine) {
    filterQuery += ` AND LOWER(cuisine) = LOWER('${cuisine}')`;
  }
  if (price) {
    filterQuery += ` AND price = '${price}'`;
  }
  if (star) {
    filterQuery += ` AND star = ${parseInt(star)}`;
  }

  connection.query(filterQuery, (err, result) => {
    if (err) {
      console.error('Error fetching restaurant data:', err);
      res.status(500).send('Error fetching restaurant data');
    } else if (result.length > 0) {
      console.log(`Found ${result.length} restaurants`);
      res.status(200).json(result);
    } else {
      console.log('No restaurants found for the specified filters');
      res.status(404).send('No restaurants found for the specified filters');
    }
  });
}

const getMichelin = async function(req, res) {
  connection.query(`
    SELECT *
    FROM Michelin
  `, (err, result) => {
    if (err) {
      res.status(500).send('Error during fetching michelin data');
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No michelin data found');
    }
  });
}

const getRestaurantDetails = async function(req, res) {
  const { id } = req.params;

  connection.query(`
    SELECT *
    FROM Restaurant
    WHERE id = ?
  `, [id], (err, result) => {
    if (err) {
      console.error('Error fetching restaurant details:', err);
      res.status(500).send('Error fetching restaurant details');
    } else if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send('Restaurant details not found');
    }
  });
}

const getParkingLotsNearby = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
      return res.status(400).send("Latitude and longitude are required");
  }

  const query = `
      SELECT *, 
      (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * 
          cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * sin(radians(latitude))
      )) AS distance
      FROM Parkinglot
      HAVING distance <= 0.5
  `;

  connection.query(query, [latitude, longitude, latitude], (err, results) => {
      if (err) {
          console.error('Error fetching parking lots:', err);
          return res.status(500).send('Error fetching parking lots');
      }
      res.status(200).json(results);
  });
};

const getTopTenHotelsByHighReviews = async function(req, res) {
  connection.query(`
  SELECT
      id,
      name,
      neighbourhood,
      room_type,
      price,
      availability_365,
      reviews_per_month,
      Number_of_reviews_ltm,
      RANK() OVER (ORDER BY reviews_per_month DESC, number_of_reviews_ltm DESC) AS rank_sequence
FROM (
  SELECT id, name, neighbourhood, room_type, price, availability_365, reviews_per_month, number_of_reviews_ltm FROM Airbnb
  UNION ALL
  SELECT PARID as id, null as name, borough as neighbourhood, null as room_type, null as price,null as availability_365, null as reviews_per_month, null as number_of_reviews_ltm FROM Hotels
) AS combined
WHERE
  availability_365 < 100 AND reviews_per_month > 1 AND number_of_reviews_ltm > 10
ORDER BY
  reviews_per_month DESC, number_of_reviews_ltm DESC
Limit 10;
  `, (err, result) => {
    if (err) {
      res.status(500).send('Error during fetching hotel data');
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No hotel data found');
    }
  });
};

const getTopTenHotelsByReviewDensity = async function(req, res) {
  connection.query(`
  SELECT
  id,
  name,
  neighbourhood,
  room_type,
  price,
  number_of_reviews,
  availability_365,
  reviews_per_month,
  (number_of_reviews / price) * reviews_per_month AS review_density
,RANK() OVER (ORDER BY (number_of_reviews / price) * reviews_per_month DESC) AS rank_sequence
FROM (
        SELECT id, name, neighbourhood, room_type,  number_of_reviews,price, availability_365, reviews_per_month, number_of_reviews_ltm FROM Airbnb
        UNION ALL
        SELECT PARID as id, null as name, borough as neighbourhood, null as room_type, null as number_of_reviews, null as price,null as availability_365, null as reviews_per_month, null as number_of_reviews_ltm FROM Hotels
    ) AS combined
WHERE
  availability_365 > 0 AND price > 0 AND number_of_reviews > 0 
ORDER BY
  review_density DESC, 
  number_of_reviews DESC, 
  price, 
  availability_365 DESC
LIMIT 10
  `, (err, result) => {
    if (err) {
      res.status(500).send('Error during fetching hotel data');
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No hotel data found');
    }
  });
};

const getTopTenHotelsByValueScore = async function(req, res) {
  connection.query(`
  SELECT
  id,
  name,
  host_name,
  neighbourhood_group,
  neighbourhood,
  room_type,
  price,
  number_of_reviews,
  availability_365,
  (number_of_reviews * availability_365 / IF(price=0, 1, price)) AS value_score
,RANK() OVER (ORDER BY (number_of_reviews * availability_365 / IF(price=0, 1, price)) DESC) AS rank_sequence
FROM (
        SELECT id, name,host_name, neighbourhood, neighbourhood_group, room_type,  number_of_reviews,price, availability_365, reviews_per_month, number_of_reviews_ltm FROM Airbnb
        UNION ALL
        SELECT PARID as id, null as name, null as host_name, null as neighbourhood_group, borough as neighbourhood, null as room_type, null as number_of_reviews, null as price,null as availability_365, null as reviews_per_month, null as number_of_reviews_ltm FROM Hotels
    ) AS combined
ORDER BY
  value_score DESC,
  number_of_reviews DESC,
  availability_365 DESC
limit 10
  `, (err, result) => {
    if (err) {
      res.status(500).send('Error during fetching hotel data');
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No hotel data found');
    }
  });
};



module.exports = {
  getUsers,
  userRegistration,
  userLogin,
  getParkingLots,
  getRestaurantsByCuisine,
  getMichelinByFilters,
  getMichelin,
  getRestaurantDetails,
  getParkingLotsNearby,
  getTopTenHotelsByHighReviews,
  getTopTenHotelsByReviewDensity,
  getTopTenHotelsByValueScore
};
  
