import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.route.js';
import apiRouter from './routes/api.route.js';

var app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/api', apiRouter);

var listener = app.listen(process.env.PORT ?? 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
