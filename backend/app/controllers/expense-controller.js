const pool = require('../db');

// get Expense
const getExpense = async (req, res) => {
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
          or e.date::text like '%${search}%'
          or  u.user_name::text like '%${search}%'
          or  a.account_type like '%${search}%'
          or  a.bank_name like '%${search}%'
          or  amount::text like '%${search}%'
          or  payment_method like '%${search}%'
          or  remark like '%${search}%'
          or  amount::text like '%${search}%'

        )`;
    }
    searchQuery += ` and e.is_active = ${active}  `;

    const query = `
        SELECT
          e.id,
          e.date,
          e.user_id,
          account_id,
          amount,
          payment_method,
          remark,
          u.user_name as user_name,
          u.id as user_id,
          a.id as account_id,
          u.user_name as to_user_name,
          a.account_type as account_type,
          a.bank_name as bank_name,
          a.account_number as account_number,
          ee.expense_type as expense_type,
          ee.id as expense_type_id
        FROM
          public.expense e
        join
          users u On u.id = e.user_id
        join
          account a on a.id = e.account_id
        join
         expense_type ee on ee.id = e.expense_type_id

        group by
            u.id,
            a.id,
            e.id,
            e.date,
            e.user_id,
            account_id,
            amount,
            payment_method,
            remark,
            u.user_name,
            a.account_type,
            a.bank_name,
            a.account_number,
            e.is_active,
            ee.expense_type,
            ee.id
          ${searchQuery}
        order by
          ${orderBy} ${direction} OFFSET ${offset}
        LIMIT
          ${pageSize}`;
    console.log(query);
    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark,expenseTypeId } = req.body;

    const query1 = `INSERT INTO public.expense(
        date, user_id, account_id, expense_type_id,  amount, payment_method, remark)
        VALUES
          (now(), ${userId}, ${accountId}, ${expenseTypeId},${amount}, '${paymentMethod}','${remark}')`;
          console.log(query1);
    const response1 = await pool.query(query1);
    let res1 = response1.rows;


    const query2 = ` UPDATE public.account
      SET balance = balance - ${amount}
      WHERE id = ${accountId}`;
    const response2 = await pool.query(query2);
    let res2 = response2.rows;

    const response = { res1, res2 };
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { userId, accountId, amount,expenseTypeId, paymentMethod, remark, id } = req.body;

    const query2 = `select amount, id from expense where id = ${id}`
    const response2 = await pool.query(query2);
    let res2 = response2.rows[0].amount;

    const query1 = `
    UPDATE
      public.expense
    SET
      date = now(),
      user_id = ${userId},
      expense_type_id = ${expenseTypeId},
      account_id = '${accountId}',
      amount = '${amount}',
      payment_method = '${paymentMethod}',
      remark = '${remark}'
    WHERE
      id=${id};
  `
  const response1 = await pool.query(query1);
  let res1 = response1.rows;



  const query3 = `
    UPDATE
      public.account
    SET
      balance = balance + ${res2}
    WHERE
      id = ${accountId}`;
      console.log(query3);
  const response3 = await pool.query(query3);
  let res3 = response3.rows;

  const query4 = `
    UPDATE
      public.account
    SET
      balance = balance - ${amount}
    WHERE
      id = ${accountId}`;
  const response4 = await pool.query(query4);
  let res4 = response4.rows;

  const response = { res1, res2, res3, res4 };
    return res.status(200).json(response);
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
