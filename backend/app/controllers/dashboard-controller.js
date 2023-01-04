const pool = require('../db');


const getDashboardDetails = async (req, res) => {
  try {
        const {startDate, endDate} = req.body;

let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`

const query1 = `select sum(balance) as balance from account`
const  response1 = await pool.query(query1);
let res1 = response1.rows[0];

const query2 = `select sum(amount) as income from income  ${whereClause} `
const  response2 = await pool.query(query2);
let res2 = response2.rows[0]

const query3 = `select sum(amount) as expense from expense  ${whereClause} `
const  response3 = await pool.query(query3);
let res3 = response3.rows[0]

const query4 = `select sum(amount) as investment from investment  ${whereClause} `
const  response4 = await pool.query(query4);
let res4 = response4.rows[0]

const response = {res1, res2, res3, res4};
return res.status(200).json( {response});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDashboardDetailsChart = async (req, res) => {
  try {
        const {startDate, endDate} = req.body;

let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`

const query1 = `select sum(balance) as balance from account`
const  response1 = await pool.query(query1);
let res1 = response1.rows[0];

const query2 = `select sum(amount) as income from income  ${whereClause} `
const  response2 = await pool.query(query2);
let res2 = response2.rows[0]

const query3 = `select sum(amount) as expense from expense  ${whereClause} `
const  response3 = await pool.query(query3);
let res3 = response3.rows[0]

const query4 = `select sum(amount) as investment from investment  ${whereClause} `
const  response4 = await pool.query(query4);
let res4 = response4.rows[0]

const response = {res1, res2, res3, res4};
return res.status(200).json( {response});
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
    SELECT account_type, user_id, bank_name, id as account_id FROM public.account  where user_id = ${id};`);
    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardDetails,
  getDashboardDetailsChart,
  addAccount,
  updateAccount,
  removeAccount,
  getAccountDropDownByUserId
};
