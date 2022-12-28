const pool = require('../db');

// get account
const getTransfer = async (req, res) => {
  try {
    const { rows } = await pool.query(`
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
          a.account_type
        FROM
          public.transfer t
          join users u on u.id = user_id
          join account a on a.id = account_id


    `);
    return res.status(200).json(rows);
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
    const { rows } = await pool.query(`
    INSERT INTO public.transfer(
      date, user_id, to_user_id, amount, payment_method, remark, account_id, to_account_id)
      VALUES (now(),  ${userId}, ${toUserId}, ${amount}, '${paymentMethod}', '${remark}', ${accountId}, ${toUserAccountId});
    `);
    return res.status(200).json(rows);
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
    const { rows } = await pool.query(`
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
  `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeTransfer = async (req, res) => {
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
  getTransfer,
  addTransfer,
  updateTransfer,
  removeTransfer
};
