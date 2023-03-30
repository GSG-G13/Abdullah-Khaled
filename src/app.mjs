import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const depIata = req.query.dep_iata;
  const arrIata = req.query.arr_iata;
  const flightDate = req.query.flight_date;
  const url = `https://api.aviationstack.com/v1/flights?access_key=3e940fca283625d2f4afd3d4ed6d62b1&dep_iata=${depIata}&arr_iata=${arrIata}&flight_date=${flightDate}`;

  console.log(url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred. Please try again later.');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});