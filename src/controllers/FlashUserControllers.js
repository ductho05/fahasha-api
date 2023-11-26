const { Int, Float } = require("mssql");
const FlashUser = require("../models/FlashUser");
const FlashSale = require("../models/FlashSale");
const responeObject = require("../models/responeObject");
const { format } = require('date-fns-tz');
const resObj = new responeObject("", "", {});

class FlashUserControllers {
  // Lấy dữ liệu sách theo id
  async getFlashById(req, res) {
    try {
      const data = await FlashUser.findById(req.params.id)
      .populate({
        path: 'Flash',
        populate: {
          path: 'categoryId',
          model: 'Category' // Tên của mô hình Category
        }
      })
        .exec();
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get Flash successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found Flash";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error get data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }
  // Lấy tất cả dữ liệu sách + phân trang + sắp theo giá
  async getFlash(req, res) {

    // Tên danh mục
    var flashId = req.query.flashId;
    var userid = req.query.userid;
    // Lấy num sản phẩm thôi
    var num = req.query.num;
    // Số trang
    var page = parseInt(req.query.page);
    // Số sản phẩm trên 1 trang
    var perPage = parseInt(req.query.perPage);
    // Tính số sản phẩm bỏ qua
    var start = (page - 1) * perPage;
    // Tính số sản phẩm lấy ra
    var end = perPage ? perPage : num

    // Sắp xếp
    var sort = req.query.sort;

    // Sắp xếp theo trường nào đó
    var filter = req.query.filter;


    var date = req.query.date;
    var point = req.query.point;
    
    var enddate = req.query.enddate;

    try {
      // const currentDate = new Date();
      
      // let current_point_sale = Math.floor(currentDate.getHours()/3);      
      // let toDay = currentDate.toISOString().slice(0, 10);
      
      const FlashUsers = await FlashUser

      // tìm theo  id
    
       .find(flashId ? {flashid: flashId} : {})
      // tìm theo ngày và khung giờ

  //     .find(!date ? {} :  enddate ? {
  //       $and: [
  //         { date_sale: { $gte: date } },
  //         { date_sale: { $lte: enddate } },         
  //       ],
  //     } : {       
  //       date_sale: date ,
  //     })
  //     .find(point ? {
  //       point_sale: point 
  //     } : {})

  //     .find(filter == "expired" ? {
  //       $and: [
  //         { date_sale: toDay },
  //         { point_sale: current_point_sale },
  //       ],
  //     } : {})
  //     .find(filter == "no-expired" ? {
  //       $or: [
  //   {
  //    $and: [
  //         { date_sale: toDay },
  //         { point_sale: {$gt : current_point_sale} },
  //       ],
  //   },
  //   {
  //     date_sale: { $gt: toDay },     
  //   }
  // ]
  //     } : {})
  .populate
  ({
    path: 'userid', model: 'User'})

      .populate({
        path: 'flashid',
        populate: {
          path: 'product',
          model: 'Product' ,// Tên của mô hình Category
          populate: {
            path: 'categoryId',
            model: 'Category' // Tên của mô hình Category
          }
        }
      })
      .skip(start)
      .limit(end)
      .exec();
      
    // Lặp qua danh sách FlashUsers để lấy thông tin category từ biến Flash.category
    const FlashUsersWithCategory = FlashUsers.filter((FlashUser) => {
      return true
    });  

      if (sort) {
        if (sort == "reverse") FlashUsersWithCategory.reverse();
        if (filter == "num_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.num_sale - b.num_sale;
            }
            if (sort == "desc") {
              return b.num_sale - a.num_sale;
            }
          });
        }
        if (filter == "sold_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.sold_sale - b.sold_sale;
            }
            if (sort == "desc") {
              return b.sold_sale - a.sold_sale;
            }
          });
        }
        if (filter == "current_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.current_sale - b.current_sale;
            }
            if (sort == "desc") {
              return b.current_sale - a.current_sale;
            }
          });
        }
        if (filter == "date_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            let dateA = new Date(a.date_sale);
            let dateB = new Date(b.date_sale);
            if (sort == "asc") {
              return dateA - dateB;
            }
            if (sort == "desc") {
              return dateB - dateA;
            }
          });
        }
        if (filter == "point_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.point_sale - b.point_sale;
            }
            if (sort == "desc") {
              return b.point_sale - a.point_sale;
            }
          });
        }
        if (filter == "time_sale") {
          FlashUsersWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.time_sale - b.time_sale;
            }
            if (sort == "desc") {
              return b.time_sale - a.time_sale;
            }
          });
        }
        
        // if (filter == "status") {
        //   FlashUsersWithCategory.sort(function (a, b) {
        //     if (sort == "asc") {
        //       return a.status - b.status;
        //     }
        //     if (sort == "desc") {
        //       return b.status - a.status;
        //     }
        //   });
        // }
        // if (filter == "discount") {
        //   FlashUsersWithCategory.sort(function (a, b) {
        //     let discountA = a.old_price / a.price;
        //     let discountB = b.old_price / b.price;
        //     if (sort == "asc") {
        //       return discountA - discountB;
        //     }
        //     if (sort == "desc") {
        //       return discountB - discountA;
        //     }
        //   });
        // }
      }

      // Lấy num sản phẩm thôi
      // if (num > 0) {
      //   FlashUsersWithCategory.splice(num);
      // }

      if (FlashUsersWithCategory) {
        resObj.status = "OK";
        resObj.message = "Found Flash successfully";
        resObj.data = FlashUsersWithCategory;
        res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found data";
        resObj.data = "";
        res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = "Error when get data: " + err;
      resObj.data = "";
      res.json(resObj);
    }
  }


 
  // Thêm dữ liệu sách
  async addFlash(req, res) {
    try {
      const data = await FlashUser.create(req.body);
      const currentDate = new Date();
      let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
      let current_point_sale = Math.floor(new Date().getHours()/3);
      console.log("current_point_sale", data[0].flashid, toDay, current_point_sale);
      if (data) {
        const flashSale = await FlashSale.find({ _id: data[0].flashid, date_sale: toDay, point_sale: current_point_sale });
        if (flashSale.length > 0) {
          flashSale[0].sold_sale += data[0].mount;
          await FlashSale.findByIdAndUpdate(flashSale[0]._id, flashSale[0]).exec();
        }
        else {
          console.log("flashSal not nothing");
        }
        resObj.status = "OK";
        resObj.message = "Add Flash successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Add Flash failed";
        resObj.data = {};
        return res.json(resObj);
      }
    
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error add data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
      
  }

  // Sửa dữ liệu sách theo id
  // Sửa dữ liệu sách theo id
  async updateFlashUser(req, res) {
    try {
      const id = req.params.id
      const filter = { _id: id }
      const updateFlash = req.body
      const result = await FlashUser.findByIdAndUpdate(filter, updateFlash).exec()
      if (result) {
        resObj.status = "OK";
        resObj.message = "Update Flash successfully";
        resObj.data = updateFlash;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Update Flash failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error update data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Hàm kiểm tra và xóa Flash Sale hết hạn
  async checkAndDeleteExpiredSales(req, res)  {

  try {
    const currentDate = new Date();
      //const inputDate = new Date(req.body.date_sale);

      const currentHour = currentDate.getHours();      
     // const inputTime = req.body.point_sale;

     // let toDay = currentDate.toISOString().slice(0, 10);
      let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
      //let inputDay = inputDate.toISOString().slice(0, 10);
    // Tìm tất cả các Flash Sale đã hết hạn
    const expiredSales = await FlashUser.find({ date_sale: { $lte: toDay } });
    // Xóa các Flash Sale đã hết hạn
    for (const sale of expiredSales) {
      await FlashUser.deleteOne({ _id: sale._id });
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra và xóa Flash Sale hết hạn:', err);
  }
};


  // Xóa dữ liệu sách theo id
  async deleteFlashUser(req, res) {
    try {
      const data = await FlashUser.deleteOne({ _id: req.params.id });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Delete Flash successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Delete Flash failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = `Error delete data. Error: ${err}`;
      resObj.data = {};
      return res.json(resObj);
    }
  }


}


module.exports = new FlashUserControllers();
