const pool = require('../db');

// get User
const getUser = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;

    let searchQuery = 'having true';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          user_name like '%${search}%'
          or u.date::text like '%${search}%'
          or email like '%${search}%'
          or mobile_number::text like '%${search}%'
        )`;
    }
    searchQuery += ` and u.is_active = ${active}  `;

    const query = `
          SELECT
          u.id,
          user_name,
          u.date,
          email,
          mobile_number,
          password,
          sum(a.balance) as user_wise_balance
        FROM
          public.users u
        Join
          public.account a
        on
          a.user_id = u.id
        group by
          u.id,
          user_name,
          u.date,
          email,
          password,
          mobile_number,
          u.is_active

          ${searchQuery}
        order by
          ${orderBy} ${direction} OFFSET ${offset}
        LIMIT
          ${pageSize}`;
    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { userName, email, mobileNumber, password } = req.body;
    const { rows } = await pool.query(`INSERT INTO public.users(
       user_name, date, email, mobile_number, password)
      VALUES ('${userName}', now(), '${email}', ${mobileNumber}, '${password}');`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userName, email, mobileNumber, password, id } = req.body;
    const { rows } = await pool.query(`UPDATE public.users
    SET  user_name='${userName}', date = now(), email ='${email}', mobile_number=${mobileNumber}, password= '${password}'
    WHERE id=${id};`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeUser = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.users
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDropDown = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, user_name FROM public.users where is_active = true`
    );
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser,
  getUserDropDown
};
