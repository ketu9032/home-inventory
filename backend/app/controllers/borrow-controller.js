const pool = require('../db');
const getBorrow = async (req, res) => {
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
          or b.date::text like '%${search}%'
          or  u.user_name::text like '%${search}%'
          or  a.account_type like '%${search}%'
          or  a.bank_name like '%${search}%'
          or  amount::text like '%${search}%'
          or  payment_method like '%${search}%'
          or  remark like '%${search}%'
          or  amount::text like '%${search}%'
        )`;
    }
    searchQuery += ` and b.is_active = ${active}  `;
    const query = `
        SELECT
          b.id,
          b.date,
          b.user_id,
          account_id,
          amount,
          payment_method,
          remark,
          ref_name,
          return_date,
          u.user_name as user_name,
          u.id as user_id,
          a.id as account_id,
          u.user_name as to_user_name,
          a.account_type as account_type,
          a.bank_name as bank_name,
          a.account_number as account_number,
          bb.first_name as first_name,
          bb.last_name as last_name,
          bb.id as borrow_name_id
        FROM
          public.borrow b
        join
          users u On u.id = b.user_id
        join
          account a on a.id = b.account_id
        join
         borrow_name bb on bb.id = b.borrow_name_id
        group by
            u.id,
            a.id,
            b.id,
            b.date,
            b.user_id,
            account_id,
            amount,
            payment_method,
            remark,
            ref_name,
            return_date,
            u.user_name,
            a.account_type,
            a.bank_name,
            a.account_number,
            b.is_active,
            bb.first_name,
            bb.last_name,
            bb.id
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
const addBorrow = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark, borrowNameId, returnDate, refName} = req.body;
    const query1 = `INSERT INTO public.borrow(
        date,  user_id, account_id, amount, payment_method, borrow_name_id, return_date, remark, ref_name)
        VALUES
          (now(), ${userId}, ${accountId}, ${amount}, '${paymentMethod}', ${borrowNameId}, '${returnDate}', '${remark}', '${refName}')`;
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
const updateBorrow = async (req, res) => {
  try {
    const { userId, accountId, amount, paymentMethod, remark, borrowNameId, returnDate, refName, id } = req.body;
    const query2 = `select amount, id from borrow where id = ${id}`
    const response2 = await pool.query(query2);
    let res2 = response2.rows[0].amount;
    const query1 = `
    UPDATE
      public.borrow
    SET
      date = now(),
      user_id = ${userId},
      borrow_name_id = ${borrowNameId},
      account_id = ${accountId},
      amount = ${amount},
      payment_method = '${paymentMethod}',
      remark = '${remark}',
      return_date = '${returnDate}',
      ref_name = '${refName}'
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
const removeBorrow = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.borrow
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getBorrow,
  addBorrow,
  updateBorrow,
  removeBorrow,
};
