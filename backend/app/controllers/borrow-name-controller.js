const pool = require('../db');
const getBorrowName = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;
    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;
    if (search) {
      searchQuery += ` and
        (
          first_name like '%${search}%'
          or date::text like '%${search}%'
          or mobile_number::text like '%${search}%'
          or alternative_number::text like '%${search}%'
          or last_name like '%${search}%'
        )`;
    }
    searchQuery += ` and is_active = ${active}  `;
    const query = `
    SELECT id, date, first_name, mobile_number, alternative_number, last_name, is_active
    FROM public.borrow_name
    Group by
    id,
    date, first_name, mobile_number, alternative_number, last_name,  is_active
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
const addBorrowName = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, alternativeNumber  } = req.body;
    const query1 = `INSERT INTO public.borrow_name(
      date, first_name,last_name, mobile_number, alternative_number )
      VALUES (now(), '${firstName}', '${lastName}',${mobileNumber}, ${alternativeNumber})`;
    const response = await pool.query(query1);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBorrowName = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, alternativeNumber, id } = req.body;
    const query =  `
    UPDATE public.borrow_name
	SET date = now(), first_name = '${firstName}', last_name = '${lastName}', mobile_number = ${mobileNumber}, alternative_number = ${alternativeNumber}
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
const removeBorrowName = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE  public.borrow_name
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBorrowNameDropDown = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, first_name, last_name FROM public.borrow_name where is_active = true`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getBorrowName,
  addBorrowName,
  updateBorrowName,
  removeBorrowName,
  getBorrowNameDropDown
};
