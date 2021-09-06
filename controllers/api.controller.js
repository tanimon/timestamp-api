import moment from 'moment';

export const getCurrentDate = (_, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
};

export const getDate = (req, res) => {
  const dateParam = req.params.date;
  const date = !isNaN(dateParam)
    ? new Date(parseInt(dateParam))
    : moment.utc(dateParam, 'YYYY-MM-DD', true).isValid()
    ? new Date(dateParam)
    : moment.utc(dateParam, 'DD MMMM YYYY', true).isValid()
    ? moment.utc(dateParam, 'DD MMMM YYYY').toDate()
    : undefined;

  if (!date) {
    res.json({ error: 'Invalid Date' });
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({ unix, utc });
};
