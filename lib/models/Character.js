const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return all characters with a list of quotes
    const { rows } = await pool.query(`
    SELECT characters.*, 
	coalesce(json_agg(to_jsonb(quotes))) as quotes
from
    characters left join quotes 
    on quotes.id = characters.id
group by characters.id
    `);
    return rows.map((char) => new Character(char));
  }
}

module.exports = Character;
