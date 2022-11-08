const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return a list of Episodes with quotes
    const { rows } = await pool.query(`
    SELECT episodes.*,
	coalesce(json_agg(to_jsonb(quotes))) as quotes
from
	episodes left join quotes on quotes.id = episodes.id
group by episodes.id
    `);
    return rows.map((epi) => new Episode(epi));
  }
}

module.exports = { Episode };
