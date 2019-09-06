var sql = require('../config/database');

exports.dashboard = function (merchant_id, from_date, to_date, callback) {
    let sql_str =   "SELECT t.id AS voucher_type_id, t.merchant_id, t.voucher_type_name, SUM(v.price * v.quantity) AS amount, DATE(v.createdAt) AS created_date " +
                    "FROM voucher v " +
                    "LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) " +
                    "WHERE t.merchant_id = ? " + 
                    "GROUP BY voucher_type_id, created_date " +
                    "HAVING created_date >= ? AND created_date <= ? " +
                    "ORDER BY voucher_type_id, created_date";
    
    sql.query(sql_str, [merchant_id, from_date, to_date], function (error, result) {             
        if(error) {
            callback(error, null);
        } else {
            let created_info = [];
            let cur_voucher_type = {
                id: 0,
                voucher_type_name : '',
                daily_list : []
            };

            result.forEach(record => {
                let daily_item = {
                    created_date : record['created_date'],
                    amount: parseFloat(record['amount'])
                };

                if (record['voucher_type_id'] != cur_voucher_type.id) {
                    if (cur_voucher_type.id != 0) {
                        let new_obj = Object.assign({}, cur_voucher_type);
                        created_info.push(new_obj);
                    }
                    cur_voucher_type.id = record['voucher_type_id'];
                    cur_voucher_type.voucher_type_name = record['voucher_type_name'];
                    cur_voucher_type.daily_list = [daily_item];
                } else {
                    cur_voucher_type.daily_list.push(daily_item);                    
                }
            });

            let new_obj = Object.assign({}, cur_voucher_type);
            created_info.push(new_obj);

            sql_str =   "SELECT t.id AS voucher_type_id, t.voucher_type_name, SUM(v.price * v.quantity) AS amount, DATE(v.redeemedAt) AS redeem_date " +
                        "FROM voucher v " +
                        "LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) " +
                        "WHERE t.merchant_id = ? " + 
                        "GROUP BY voucher_type_id, redeem_date " +
                        "HAVING redeem_date >= ? AND redeem_date <= ? " +
                        "ORDER BY voucher_type_id, redeem_date";
    
            sql.query(sql_str, [merchant_id, from_date, to_date], function (error, result) {             
                if(error) {
                    callback(error, null);
                } else {
                    let redeem_info = [];
                    cur_voucher_type = {
                        id: 0,
                        voucher_type_name : '',
                        daily_list : []
                    };

                    result.forEach(record => {
                        let daily_item = {
                            redeem_date : record['redeem_date'],
                            amount: parseFloat(record['amount'])
                        };
        
                        if (record['voucher_type_id'] != cur_voucher_type.id) {
                            if (cur_voucher_type.id != 0) {
                                let new_obj = Object.assign({}, cur_voucher_type);
                                redeem_info.push(new_obj);
                            }
                            cur_voucher_type.id = record['voucher_type_id'];
                            cur_voucher_type.voucher_type_name = record['voucher_type_name'];
                            cur_voucher_type.daily_list = [daily_item];
                        } else {
                            cur_voucher_type.daily_list.push(daily_item);                    
                        }
        
                    });
        
                    let new_obj = Object.assign({}, cur_voucher_type);
                    redeem_info.push(new_obj);
                    callback(null, {created_info: created_info, redeem_info: redeem_info});
                }
            });
        }
    }); 
}
