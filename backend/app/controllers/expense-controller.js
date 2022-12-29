const pool = require('../db');

// get Expense
const getExpense = async (req, res) => {
  try {
    const { rows } = await pool.query(`
        SELECT
        e.id,
        e.date,
        e.user_id,
        account_id,
        to_user_id,
        amount,
        payment_method,
        remark,
        u.user_name as user_name,
        u.id as user_id,
        a.id as account_id,
        a.account_type as account_type,
        a.account_number as account_number
      FROM
        public.expense e
        join users u On u.id = e.user_id
        join account a on a.id = e.account_id
      where
        e.is_active = true;

    `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const { userId, accountId, toUserId, amount, paymentMethod, remark } =
      req.body;
    const { rows } = await pool.query(`
    INSERT INTO public.expense(
      date, user_id, account_id, to_user_id, amount, payment_method, remark
      )
      VALUES
        (
          now(), ${userId}, ${accountId}, ${toUserId},
          ${amount}, '${paymentMethod}',
          '${remark}'
        );
    `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { userId, accountId, toUserId, amount, paymentMethod, remark, id } =
      req.body;
    const { rows } = await pool.query(`
        UPDATE
      public.expense
    SET
      date = now(),
      user_id = ${userId},
      account_id = '${accountId}',
      to_user_id = ${toUserId},
      amount = '${amount}',
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
const removeExpense = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.expense
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExpense,
  addExpense,
  updateExpense,
  removeExpense
};
