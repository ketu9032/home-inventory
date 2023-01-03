const pool = require('../db');

// get income
const getIncomeType = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;

    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          income_type like '%${search}%'
          or date::text like '%${search}%'

        )`;
    }
    searchQuery += ` and is_active = ${active}  `;

    const query = `
    SELECT id, date, income_type, is_active
    FROM public.income_type
    Group by
    id,
    date, income_type, is_active
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

const addIncomeType = async (req, res) => {
  try {
    const { incomeType } = req.body;

    const query1 = `INSERT INTO public.income_type(
      date, income_type)
      VALUES (now(), '${incomeType}')`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncomeType = async (req, res) => {
  try {
    const { incomeType, id } = req.body;
    const query =  `
    UPDATE public.income_type
	SET date = now(), income_type= '${incomeType}'
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
const removeIncomeType = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE  public.income_type
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncomeTypeDropDown = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, income_type FROM public.income_type where is_active = true`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIncomeType,
  addIncomeType,
  updateIncomeType,
  removeIncomeType,
  getIncomeTypeDropDown
};
