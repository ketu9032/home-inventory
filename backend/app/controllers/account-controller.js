const pool = require('../db');

// get account
const getAccount = async (req, res) => {
  try {
    const { rows } = await pool.query(`
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
      where
        a.is_active = true

    `);
    return res.status(200).json(rows);
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
    const { rows } = await pool.query(`
    INSERT INTO public.account(
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
        );
    `);
    return res.status(200).json(rows);
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
    const { id } = req.body;
    const query = await pool.query(`UPDATE public.account
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountDropDownByUserId = async (req, res) => {
  const { id } = req.body;
  try {
    const { rows } = await pool.query(`
    SELECT account_type, user_id, id as account_id FROM public.account  where user_id = 4 ;`);
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
