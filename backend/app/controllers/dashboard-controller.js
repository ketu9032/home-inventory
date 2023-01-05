const pool = require('../db');

const getDashboardDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`;

    const query1 = `select sum(balance) as balance from account`;
    const response1 = await pool.query(query1);
    let res1 = response1.rows[0];

    const query2 = `select sum(amount) as income from income  ${whereClause} `;
    const response2 = await pool.query(query2);
    let res2 = response2.rows[0];

    const query3 = `select sum(amount) as expense from expense  ${whereClause} `;
    const response3 = await pool.query(query3);
    let res3 = response3.rows[0];

    const query4 = `select sum(amount) as investment from investment  ${whereClause} `;
    const response4 = await pool.query(query4);
    let res4 = response4.rows[0];

    const response = { res1, res2, res3, res4 };
    return res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// pending
const getDashboardDetailsChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`;

    const query1 = `
    select date,  sum(i.amount) as amount
    from
       (select date, sum(amount) as amount, id
        from investment ${whereClause}
         group by date, amount, id
      ) as i
      group by date`;
    const response1 = await pool.query(query1);
    let response = response1.rows;

    return res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvestmentChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`;

    const query1 = `
    select date,  sum(i.amount) as amount
    from
       (select date, sum(amount) as amount, id
        from investment ${whereClause}
         group by date, amount, id
      ) as i
      group by date`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncomeChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`;

    const query1 = `
    select date,  sum(i.amount) as amount
    from
       (select date, sum(amount) as amount, id
        from income ${whereClause}
         group by date, amount, id
      ) as i
      group by date`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenseChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let whereClause = ' where true ';

    whereClause += `and date::date between CAST (now() - interval '30 day' as DATE):: date
    And CAST (now() as DATE):: date`;

    const query1 = `
    select date,  sum(e.amount) as amount
    from
       (select date, sum(amount) as amount, id
        from expense ${whereClause}
         group by date, amount, id
      ) as e
      group by date`;
    const response = await pool.query(query1);

    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardDetails,
  getDashboardDetailsChart,
  getInvestmentChart,
  getIncomeChart,
  getExpenseChart,
};
