const pool = require('../db');


const getAccount = async (req, res) => {
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
          u.user_name like '%${search}%'
          or a.date::text like '%${search}%'
          or bank_name like '%${search}%'
          or account_number::text like '%${search}%'
          or account_holder_name like '%${search}%'
          or ifsc_code like '%${search}%'
          or branch_name like '%${search}%'
          or account_number::text like '%${search}%'
          or account_type like '%${search}%'
          or swift_code like '%${search}%'
          or a.balance::text like '%${search}%'
        )`;
    }
    searchQuery += ` and a.is_active = ${active}  `;

    const query = `
          SELECT
          a.id,
          a.date,
          user_id,
          bank_name,
          account_number,
          account_holder_name,
          ifsc_code,
          branch_name,
          a.is_active,
          a.balance,
          account_type,
          swift_code,
          u.user_name as user_name
        FROM
          public.account a
          Join users u ON u.id = a.user_id
        group by
          a.id,
          user_id,
          a.date,
          bank_name,
          account_number,
          account_holder_name,
          ifsc_code,
          branch_name,
          a.is_active,
          a.balance,
          account_type,
          swift_code,
          u.user_name
          ${searchQuery}
        order by
          ${orderBy} ${direction} OFFSET ${offset}
        LIMIT
          ${pageSize}
      `

    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAccount = async (req, res) => {
  try {
    const {
      userId,
      bankName,
      accountNumber,
      accountHolderName,
      ifscCode,
      branchName,
      balance,
      accountType,
      swiftCode
    } = req.body;

  const query = ` INSERT INTO public.account(
    date,
    user_id,
    bank_name,
    account_number,
    account_holder_name,
    ifsc_code,
    branch_name,
    balance,
    account_type,
    swift_code )
    VALUES
      (
        now(), ${userId}, '${bankName}', ${accountNumber},
        '${accountHolderName}', '${ifscCode}',
        '${branchName}', ${balance}, '${accountType}',
        '${swiftCode}'
      );`

    const  response1 = await pool.query(query);
    let res1 = response1.rows

    const response2 = await pool.query(`
    UPDATE public.users
    SET  balance = balance + ${balance}
    WHERE id= ${userId};
    `)

    let res2 = response2.rows
  const response = {res1, res2};

    return res.status(200).json( {response});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const {
      userId,
      bankName,
      accountNumber,
      accountHolderName,
      ifscCode,
      branchName,
      balance,
      accountType,
      swiftCode,
      id
    } = req.body;
    const { rows } = await pool.query(`
        UPDATE
      public.account
    SET
      date = now(),
      user_id = ${userId},
      bank_name = '${bankName}',
      account_number = ${accountNumber},
      account_holder_name = '${accountHolderName}',
      ifsc_code = '${ifscCode}',
      branch_name = '${branchName}',
      balance = ${balance},
      account_type = '${accountType}',
      swift_code = '${swiftCode}'
    WHERE
      id=${id};
  `);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeAccount = async (req, res) => {
  try {
    const { id } = req.query;
    const query = await pool.query(`UPDATE public.account
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountDropDownByUserId = async (req, res) => {
  const { id } = req.query;
  try {
    const { rows } = await pool.query(`
    SELECT account_type, user_id, id as account_id FROM public.account  where user_id = ${id};`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAccount,
  addAccount,
  updateAccount,
  removeAccount,
  getAccountDropDownByUserId
};
