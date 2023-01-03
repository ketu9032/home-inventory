const pool = require('../db');

// get account
const getTransfer = async (req, res) => {
  try {
    const {
      orderBy,
      direction,
      pageSize,
      pageNumber,
      search,
      active
    } = req.query;

    let searchQuery = 'having true';
    let whereClause = ' where true ';
    const offset = pageSize * pageNumber - pageSize;

    if (search) {
      searchQuery += ` and
        (
          user_name like '%${search}%'
          or t.date::text like '%${search}%'
          or t.payment_method like '%${search}%'
          or t.remark::text like '%${search}%'
          or t.amount::text like '%${search}%'
        )`;
    }
    searchQuery += ` and t.is_active = ${active}  `;
    const query = `
       SELECT
          t.id,
          t.date,
          t.user_id,
          to_user_id,
          amount,
          payment_method,
          remark,
          t.is_active,
          u.user_name as user_name,
          uu.user_name as to_user_name,
          a.account_type,
          a.bank_name,
          a.id as account_id,
          aa.account_type as to_account_type,
          aa.bank_name as to_bank_name,
          aa.id as to_user_account_id
        FROM
          public.transfer t
        join
          users u on u.id = user_id
        join
          users uu on uu.id = to_user_id
        join
          account a on a.id = account_id
        join
          account aa on aa.id = to_account_id
        GROUP BY
          t.id,
          t.date,
          t.user_id,
          to_user_id,
          amount,
          payment_method,
          remark,
          t.is_active,
          u.user_name,
          a.account_type,
          a.bank_name,
          a.id,
          uu.user_name,
          aa.account_type,
          aa.bank_name,
          aa.id,
          t.is_active
          ${searchQuery}
        order by
            ${orderBy} ${direction} OFFSET ${offset}
        LIMIT
            ${pageSize}`
   const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransfer = async (req, res) => {
  try {
    const {
      userId,
      accountId,
      toUserId,
      toUserAccountId,
      amount,
      paymentMethod,
      remark
    } = req.body;

    const query1 = `
        INSERT INTO public.transfer(
          date, user_id, to_user_id, amount,
          payment_method, remark, account_id,
          to_account_id
          )
        VALUES
         (
            now(), ${userId}, ${toUserId}, ${amount},
            '${paymentMethod}', '${remark}',
            ${accountId}, ${toUserAccountId}
      )`
      const response1  = await pool.query(query1);
      let res1 = response1.rows;

    const query2 = ` UPDATE public.account
      SET balance = balance + ${amount}
      WHERE id = ${toUserAccountId}`;
    const response2 = await pool.query(query2);
    let res2 = response2.rows;

    const query3 = ` UPDATE public.account
        SET balance = balance - ${amount}
        WHERE id = ${accountId}`;
    const response3 = await pool.query(query3);
    let res3 = response3.rows;

  const response = { res1, res2, res3};

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransfer = async (req, res) => {
  try {
    const {
      userId,
      accountId,
      toUserId,
      toUserAccountId,
      amount,
      paymentMethod,
      remark,
      id
    } = req.body;

    const query1 = `select amount, id from transfer where id = ${id}`;
    const response1 = await pool.query(query1);
    let res1 = response1.rows[0].amount;

    const query2 =`
    UPDATE public.transfer
      SET
       date = now(),
        user_id = ${userId} ,
        to_user_id = ${toUserId},
        amount = ${amount},
        payment_method = '${paymentMethod}',
        remark = '${remark}',
        account_id= ${accountId},
        to_account_id=  ${toUserAccountId}

    WHERE
      id=${id};
  `
  const response2 = await pool.query(query2);
  let res2 = response2.rows;

  const query3 = `
UPDATE
  public.account
SET
  balance = balance + ${res1}
WHERE
  id = ${accountId}`;
  console.log(query3);
  const response3 = await pool.query(query3);
  let res3 = response3.rows;

  const query4 = `
UPDATE
  public.account
SET
  balance = balance - ${res1}
WHERE
  id = ${toUserAccountId}`;
  const response4 = await pool.query(query4);
  let res4 = response4.rows;

  const query5 = `
UPDATE
  public.account
SET
  balance = balance - ${amount}
WHERE
  id = ${accountId}`;
  console.log(query5);
  const response5 = await pool.query(query5);
  let res5 = response5.rows;

  const query6 = `
UPDATE
  public.account
SET
  balance = balance + ${amount}
WHERE
  id = ${toUserAccountId}`;
  const response6 = await pool.query(query6);
  let res6 = response6.rows;

  const response = { res1, res2, res3, res4, res5, res6 };
  return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeTransfer = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.transfer
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransfer,
  addTransfer,
  updateTransfer,
  removeTransfer
};
