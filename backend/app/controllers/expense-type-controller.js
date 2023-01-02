const pool = require('../db');

// get Expense
const getExpenseType = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;

    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          expense_type like '%${search}%'
          or date::text like '%${search}%'

        )`;
    }
    searchQuery += ` and is_active = ${active}  `;

    const query = `
    SELECT id, date, expense_type, is_active
    FROM public.expense_type
    Group by
    id,
    date, expense_type, is_active
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

const addExpenseType = async (req, res) => {
  try {
    const { expenseType } = req.body;

    const query1 = `INSERT INTO public.expense_type(
      date, expense_type)
      VALUES (now(), '${expenseType}')`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpenseType = async (req, res) => {
  try {
    const { expenseType, id } = req.body;
    const query =  `
    UPDATE public.expense_type
	SET date = now(), expense_type= '${expenseType}'
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
const removeExpenseType = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE  public.expense_type
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenseTypeDropDown = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, expense_type FROM public.expense_type where is_active = true`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExpenseType,
  addExpenseType,
  updateExpenseType,
  removeExpenseType,
  getExpenseTypeDropDown
};
