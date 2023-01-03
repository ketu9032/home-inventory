const pool = require('../db');

// get Expense
const getInvestment = async (req, res) => {
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
          or  u.user_name::text like '%${search}%'
          or  a.account_type like '%${search}%'
          or  a.bank_name like '%${search}%'
          or  amount::text like '%${search}%'
          or  payment_method like '%${search}%'
          or  remark like '%${search}%'
          or  amount::text like '%${search}%'
          or  investment_type like '%${search}%'
        )`;
    }
    searchQuery += ` and i.is_active = ${active}  `;

    const query = `
        SELECT
          i.id,
          i.date,
          i.user_id,
          account_id,
          amount,
          payment_method,
          remark,
          investment_type_id,
          u.user_name as user_name,
          u.id as user_id,
          a.id as account_id,
          a.account_type as account_type,
          a.bank_name as bank_name,
          ii.investment_type as investment_type

        FROM
          public.investment  i
        join
          users u On u.id = i.user_id
        join
          account a on a.id = i.account_id
        Join
          public."investment-type" ii  on ii.id = i.investment_type_id
        group by
            u.id,
            a.id,
            ii.id,
            i.id,
            i.date,
            i.user_id,
            account_id,
            amount,
            payment_method,
            remark,
            u.user_name,
            a.account_type,
            a.bank_name,
            investment_type_id,
            ii.investment_type,
            i.is_active
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

const addInvestment = async (req, res) => {
  try {
    const { userId, accountId, investmentTypeId, amount, paymentMethod, remark } = req.body;

    const query1 = `INSERT INTO public.investment(
        date, user_id, account_id, investment_type_id, amount, payment_method, remark)
        VALUES
          (now(), ${userId}, ${accountId}, ${investmentTypeId}, ${amount}, '${paymentMethod}','${remark}')`;
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

const updateInvestment = async (req, res) => {
  try {
    const { userId, accountId, investmentTypeId, amount, paymentMethod, remark, id } = req.body;
    const { rows } = await pool.query(`
    UPDATE public.investment
	SET  date = now(), user_id = ${userId}, account_id = ${accountId}, amount= ${amount} , payment_method= '${paymentMethod}', remark= '${remark}', investment_type_id= ${investmentTypeId}

    WHERE
      id=${id};
  `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeInvestment = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.investment
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getInvestment,
  addInvestment,
  updateInvestment,
  removeInvestment
};
