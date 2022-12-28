const pool = require('../db');

// get account
const getIncome = async (req, res) => {
  try {
    const { rows } = await pool.query(`
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
          a.id as account_id
        FROM
          public.income i
          join users u on u.id = i.user_id
          join account a on a.id = i.account_id
        where
          i.is_active = true;
    `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addIncome = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark } = req.body;
    const { rows } = await pool.query(`

    INSERT INTO public.income(
      date, user_id, account_id, amount, payment_method, remark)
   VALUES (now(),  ${userId},  ${accountId}, ${amount},  '${paymentMethod}',
   '${remark}');


    `);
    return res.status(200).json(rows);
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
    const { id } = req.body;
    const query = await pool.query(`UPDATE public.account
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
