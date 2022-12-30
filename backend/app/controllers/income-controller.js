const pool = require('../db');

// get account
const getIncome = async (req, res) => {
  try {
    const { orderBy, direction, pageSize, pageNumber, search, active } =
      req.query;

    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          user_name like '%${search}%'
          or i.date::text like '%${search}%'
          or amount::text like '%${search}%'
          or payment_method like '%${search}%'
          or remark like '%${search}%'
          or account_type like '%${search}%'
          or bank_name like '%${search}%'
        )`;
    }
    searchQuery += ` and i.is_active = ${active}  `;

    const query = `
      SELECT
          i.id,
          i.date,
          i.user_id,
          account_id,
          i.amount,
          payment_method,
          remark,
          i.is_active,
          u.user_name as user_name,
          a.account_type as account_type,
          a.bank_name as bank_name,
          a.id as account_id
      FROM
          public.income i
      join
          users u on u.id = i.user_id
      join
          account a on a.id = i.account_id
      GROUP BY
          i.id,
          i.date,
          i.user_id,
          account_id,
          i.amount,
          payment_method,
          remark,
          i.is_active,
          u.user_name,
          a.account_type,
          account_id,
          a.bank_name,
          a.id
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

const addIncome = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark } = req.body;

    const query = ` INSERT INTO public.income(
      date, user_id, account_id, amount, payment_method, remark)
        VALUES
      (now(),  ${userId},  ${accountId}, ${amount},  '${paymentMethod}','${remark}'); `;
    const response1 = await pool.query(query);
    let res1 = response1.rows;

    const query2 = ` UPDATE public.users
      SET balance = balance + ${amount}
      WHERE id = ${userId}`;
    const response2 = await pool.query(query2);
    let res2 = response2.rows;

    const query3 = ` UPDATE public.account
      SET balance = balance + ${amount}
      WHERE id = ${accountId}`;
    const response3 = await pool.query(query3);
    let res3 = response3.rows;

    const response = { res1, res2, res3 };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark, id } = req.body;
    const { rows } = await pool.query(`
        UPDATE
      public.income
    SET
      date = now(),
      user_id = ${userId},
      account_id = '${accountId}',
      amount = ${amount},
      payment_method = '${paymentMethod}',
      remark = '${remark}'
    WHERE
    id=${id};
  `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeIncome = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.income
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIncome,
  addIncome,
  updateIncome,
  removeIncome
};
