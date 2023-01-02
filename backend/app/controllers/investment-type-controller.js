const pool = require('../db');

// get Expense
const getInvestmentType = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;

    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          investment_type like '%${search}%'
          or date::text like '%${search}%'

        )`;
    }
    searchQuery += ` and is_active = ${active}  `;

    const query = `
    SELECT id, date, investment_type, is_active
    FROM public."investment-type"
    Group by
    id,
    date, investment_type, is_active
    ${searchQuery}
    order by
      ${orderBy} ${direction} OFFSET ${offset}
    LIMIT
      ${pageSize}

          `;
    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addInvestmentType = async (req, res) => {
  try {
    const { investmentType } = req.body;

    const query1 = `INSERT INTO public."investment-type"(
      date, investment_type)
      VALUES (now(), '${investmentType}')`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInvestmentType = async (req, res) => {
  try {
    const { investmentType, id } = req.body;
    const query =  `
    UPDATE public."investment-type"
	SET date = now(), investment_type = '${investmentType}'
    WHERE
      id=${id};
  `
  console.log(query);
    const response  = await pool.query(query);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeInvestmentType = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE  public."investment-type"
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvestmentTypeDropDown = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, investment_type FROM public."investment-type" where is_active = true`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getInvestmentType,
  addInvestmentType,
  updateInvestmentType,
  removeInvestmentType,
  getInvestmentTypeDropDown
};
