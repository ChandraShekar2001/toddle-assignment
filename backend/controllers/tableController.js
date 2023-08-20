const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

exports.getTableData = async(req, res) => {
    try {
        const {table} = req.params;
        const results = await db(table);
        res.status(200).json({
            success: true,
            results
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}