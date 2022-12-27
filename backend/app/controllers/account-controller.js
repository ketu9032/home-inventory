const pool = require("../db");

// get account
const getAccount = async (req, res) => {
  try {
    const { rows } = await pool.query(`
    SELECT a.id, a.date, user_id, bank_name, account_number, account_holder_name, ifsc_code, branch_name, a.is_active,a.balance, account_type,
    u.user_name as user_name
       FROM public.account a
        Join
        users u
        ON u.id = a.user_id
        where a.is_active = true
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
      ifscCode,branchName, balance, accountType
  } = req.body;
    const { rows } = await pool.query(`INSERT INTO public.account(
       date, user_id, bank_name, account_number, account_holder_name, ifsc_code, branch_name, balance, account_type
      VALUES (  now(), ${userId}, '${bankName}', ${accountNumber}, '${accountHolderName}' , '${ifscCode}', '${branchName}', ${balance}, '${accountType}');`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const {
     userName,
      email,
      mobileNumber,
     password,
     id
  } = req.body;
    const { rows } = await pool.query(`UPDATE public.users
    SET  user_name='${userName}', date = now(), email ='${email}', mobile_number=${mobileNumber}, password= '${password}'
    WHERE id=${id};`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeAccount = async (req, res) => {
  try {

    const { id } = req.body;
    const  query = await pool.query(`UPDATE public.users
    SET  is_active = false
    WHERE id = ${id}`);
    return res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  getAccount,
  addAccount,
  updateAccount,
  removeAccount
};
