const { Int, Float } = require("mssql");
const FlashSale = require("../models/FlashSale");
const Product = require("../models/Product")
const { format, subDays  } = require('date-fns');
const responeObject = require("../models/responeObject");

const resObj = new responeObject("", "", {});

class FlashSaleControllers {
  // Lấy dữ liệu sách theo id
  async getFlashById(req, res) {
    try {
      const data = await FlashSale.findById(req.params.id)
      .populate({
        path: 'product',
        populate: {
          path: 'categoryId',
          model: 'Category' // Tên của mô hình Category
        }
      })
        .exec();
      if (data) {
        resObj.status = "OK";
        resObj.message = "Get product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found product";
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
  async getProduct(req, res) {

    // Tên danh mục
    var categoryId = req.query.categoryId;

    // mức giảm
    var current_sale = req.query.current_sale;



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
    var productId = req.query.productId;

    var date = req.query.date;
    var point = req.query.point;
    
    var enddate = req.query.enddate;

    try {
      const currentDate = new Date();
          
      // Chuyển múi giờ sang UTC+7 (Giờ Đông Dương) Cach 1
      //const utcOffset = 7 * 60; // 7 giờ * 60 phút/giờ
      //currentDate.setMinutes(currentDate.getMinutes() + utcOffset);


      let current_point_sale = Math.floor(new Date().getHours()/3);      
      //let toDay = currentDate.toISOString().slice(0, 10);
      // Chuyen sang Dong Duong Cach 2
      let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });

      console.log("toDay: ", toDay, current_point_sale);
      const flashSales = await FlashSale

      // tìm theo mức giảm
      .find(current_sale ? {current_sale: current_sale} : {})

      // tìm theo  id
    
      .find(productId ? {product: productId} : {})
      // tìm theo ngày và khung giờ

      .find(!date ? {} :  enddate ? {
        $and: [
          { date_sale: { $gte: date } },
          { date_sale: { $lte: enddate } },         
        ],
      } : {       
        date_sale: date ,
      })
      .find(point ? {
        point_sale: point 
      } : {})

      .find(filter == "expired" ? {
        $and: [
          { date_sale: toDay },
          { point_sale: current_point_sale },
        ],
      } : {})
      .find(filter == "no-expired" ? {
        $or: [
    {
     $and: [
          { date_sale: toDay },
          { point_sale: {$gt : current_point_sale} },
        ],
    },
    {
      date_sale: { $gt: toDay },     
    }
  ]
      } : {})
      .populate({
        path: 'product',
        populate: {
          path: 'categoryId',
          model: 'Category' // Tên của mô hình Category
        }
      })
      .skip(start)
      .limit(end)
      .exec();
      
    // Lặp qua danh sách flashSales để lấy thông tin category từ biến product.category
    const flashSalesWithCategory = flashSales.filter((flashSale) => {
      //console.log("categoryId1122: ", flashSale.product.categoryId?._id);
      return categoryId ? flashSale.product.categoryId?._id == categoryId : true
    });  

      if (sort) {
        if (sort == "reverse") flashSalesWithCategory.reverse();
        if (filter == "num_sale") {
          flashSalesWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.num_sale - b.num_sale;
            }
            if (sort == "desc") {
              return b.num_sale - a.num_sale;
            }
          });
        }
        if (filter == "sold_sale") {
          flashSalesWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.sold_sale - b.sold_sale;
            }
            if (sort == "desc") {
              return b.sold_sale - a.sold_sale;
            }
          });
        }
        if (filter == "current_sale") {
          flashSalesWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.current_sale - b.current_sale;
            }
            if (sort == "desc") {
              return b.current_sale - a.current_sale;
            }
          });
        }
        if (filter == "date_sale") {
          flashSalesWithCategory.sort(function (a, b) {
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
          flashSalesWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.point_sale - b.point_sale;
            }
            if (sort == "desc") {
              return b.point_sale - a.point_sale;
            }
          });
        }
        if (filter == "time_sale") {
          flashSalesWithCategory.sort(function (a, b) {
            if (sort == "asc") {
              return a.time_sale - b.time_sale;
            }
            if (sort == "desc") {
              return b.time_sale - a.time_sale;
            }
          });
        }
        
        // if (filter == "status") {
        //   flashSalesWithCategory.sort(function (a, b) {
        //     if (sort == "asc") {
        //       return a.status - b.status;
        //     }
        //     if (sort == "desc") {
        //       return b.status - a.status;
        //     }
        //   });
        // }
        // if (filter == "discount") {
        //   flashSalesWithCategory.sort(function (a, b) {
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
      //   flashSalesWithCategory.splice(num);
      // }
      //flashSalesWithCategory[0].time_sale = flashSalesWithCategory.length;

      if (flashSalesWithCategory) {        
        resObj.status = "OK";
        resObj.message = "Found product successfully";
        resObj.data = flashSalesWithCategory;
        res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Not found data";
        resObj.data = "";
        res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = "Error when get data" + err;
      resObj.data = "";
      res.json(resObj);
    }
  }


 
  // Thêm dữ liệu sách
  async addProduct(req, res) {
    try {
      const currentDate = new Date();
      const inputDate = new Date(req.body.date_sale);

      const currentHour = currentDate.getHours();      
      const inputTime = req.body.point_sale;

      let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
      let inputDay = format(inputDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
  

      //console.log("toDay: ", toDay, inputDay, inputDate, currentDate);
    
      // Kiểm tra xem ngày date_sale có nằm trong quá khứ không
      if (inputDay < toDay || (inputDay == toDay && (inputTime+1)*3 <= currentHour)) {
        resObj.status = "Failed";
        resObj.message = "Không thể thiết đặt cho khung giờ quá khứ.";
        resObj.data = {};
        return res.json(resObj);
      }
// Tìm kiếm bản ghi trong cơ sở dữ liệu có các trường quan trọng giống với dữ liệu đầu vào
    const existingRecord = await FlashSale.findOne({
      date_sale: req.body.date_sale,
      point_sale: req.body.point_sale,
      product: req.body.product,
      //current_sale: req.body.current_sale,
      //Thêm bất kỳ trường quan trọng nào khác bạn muốn kiểm tra ở đây.
    });

    if (existingRecord) {
      // Nếu tìm thấy bản ghi trùng, cộng thêm số lượng
      existingRecord.num_sale += req.body.num_sale;
      existingRecord.current_sale = req.body.current_sale;
      await existingRecord.save();
      resObj.status = "OK";
      resObj.message = "Update product quantity successfully";
      resObj.data = existingRecord;
    } else {
      // update lại giá của sản phẩm này trong khung giờ hiện tại
      if (req.body.date_sale == toDay && req.body.point_sale == Math.floor(new Date().getHours()/3))
      {
        await Product.findById(req.body.product).exec().then((product) => {
            product.containprice = product.price;
            product.price = product.old_price * (100 - req.body.current_sale)/100;
            product.save();
          });
      }
      else {
        await Product.findById(req.body.product).exec().then((product) => {
          product.containprice = product.price;
          //product.price = product.old_price * (100 - req.body.current_sale)/100;
          product.save();
        });
      }

      const data = await FlashSale.create(req.body);
      if (data) {
        resObj.status = "OK";
        resObj.message = "Add product successfully";
        resObj.data = data;
        
      } else {
        resObj.status = "Failed";
        resObj.message = "Add product failed";
        resObj.data = {};
       
      }
    }
    return res.json(resObj);
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = Error add data. Error: ${err};
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Kiểm tra và cập nhật lại giá của sản phẩm trong khung giờ hiện tại
  async checkAndUpdatePrice(req, res) {
      try {
        // tìm các flash sale có ngày và khung giờ hiện tại
        const currentDate = new Date();
        const yesterday = subDays(currentDate, 1);
        console.log("yesterday: ", yesterday);
        let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
        // lấy giá trị ngày hôm trước
        let yes = format(yesterday, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });

        let current_point_sale = Math.floor(new Date().getHours()/3);
        console.log("toDay: ", toDay, yes);
        // ngày hôm trước
       
        const flashSales = await FlashSale.find({ date_sale: toDay, point_sale: current_point_sale });
        flashSales.forEach(async (flashSale) => {
          //console.log("flashSale: ", flashSale);
          if (flashSale.product) {            
            await Product.findById(flashSale.product).exec().then((product) => {
              console.log("da vao day")
              product.containprice = product.price; // chứa giá ban đầu
              product.price = product.old_price * (100 - flashSale.current_sale)/100; // giá mới trong flashsale
              product.save();
            });
          }
        });

        // sửa giá của sản phẩm trong khung giờ đã qua
        const flashSales1 = await FlashSale.find(current_point_sale == 0 ? {date_sale: yes, point_sale: 7}:{ date_sale: toDay, point_sale: current_point_sale - 1 });
        flashSales1.forEach(async (flashSale) => {
          if (flashSale.product) {
            await Product.findById(flashSale.product).exec().then((product) => {
              console.log("da vao day", product)
              product.sold +=  flashSale.sold_sale; // update đã bán
              product.price = product.containprice; // lấy lại giá ban đầu
              product.save();
            });
          }
        });
       

      }      
      catch (err) {
        console.error('Lỗi khi kiểm tra và update:', err);
      }
    }

  // Sửa dữ liệu sách theo id
  // Sửa dữ liệu sách theo id
  async updateFlashSale(req, res) {
    try {
      const id = req.params.id
      const filter = { _id: id }
      const updateProduct = req.body
      const result = await FlashSale.findByIdAndUpdate(filter, updateProduct).exec()
     

      if (result) {
      //   if (updateProduct.date_sale == toDay && updateProduct.point_sale == Math.floor(new Date().getHours()/3))
      // {
      //   // await Product.findById(updateProduct.product).exec().then((product) => {
      //   //     //product.containprice = product.price;
      //   //     product.price = product.old_price * (100 - updateProduct.current_sale)/100;
      //   //     product.save();
      //   //   });
      //   console.log("da vao day 1")
      // }
      // else {
      //   // await Product.findById(updateProduct.product).exec().then((product) => {    
      //   //   product.price = product.containprice
      //   //   product.save();
      //   // });
      //   console.log("da vao day 2")
      // }
        resObj.status = "OK";
        resObj.message = "Update product successfully";
        resObj.data = updateProduct;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Update product failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = Error update data. Error: ${err};
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
     let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });

     // let toDay = currentDate.toISOString().slice(0, 10);
      //let inputDay = inputDate.toISOString().slice(0, 10);
    // Tìm tất cả các Flash Sale đã hết hạn
    const expiredSales = await FlashSale.find({ date_sale: { $lte: toDay } });
    // Xóa các Flash Sale đã hết hạn
    //console.log("chua xoa");
    for (const sale of expiredSales) {
      await FlashSale.deleteOne({ _id: sale._id }); 
      //console.log("Xóa thành công Flash Sale hết hạn: ", sale._id);
    }
  } catch (err) {
    console.error('Lỗi khi kiểm tra và xóa Flash Sale hết hạn:', err);
  }
};


  // Xóa dữ liệu sách theo id
  async deleteFlashSale(req, res) {
    try {
      const data = await FlashSale.deleteOne({ _id: req.params.id });
      if (data) {
        resObj.status = "OK";
        resObj.message = "Delete product successfully";
        resObj.data = data;
        return res.json(resObj);
      } else {
        resObj.status = "Failed";
        resObj.message = "Delete product failed";
        resObj.data = {};
        return res.json(resObj);
      }
    } catch (err) {
      resObj.status = "Failed";
      resObj.message = Error delete data. Error: ${err};
      resObj.data = {};
      return res.json(resObj);
    }
  }

  // Thêm sách nếu is_loop = true và date_sale = hôm nay

  async addLoopSale(req, res) {  
    try {
      const currentDate = new Date();
        //const inputDate = new Date(req.body.date_sale);
  
        const currentHour = currentDate.getHours();      
       // const inputTime = req.body.point_sale;
       let toDay = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
        //let toDay = currentDate.toISOString().slice(0, 10);
        //let inputDay = inputDate.toISOString().slice(0, 10);
      // Tìm tất cả các Flash Sale có is_loop = true và date_sale = hôm nay
      const loopSales = await FlashSale.find({ is_loop: true, date_sale: toDay });      
      // Xóa các Flash Sale đã hết hạn
      //console.log("chua xoa", loopSales);
      for (const sale of loopSales) {
        // thêm vào ngày hôm sau       
        sale.is_loop = false;
        await sale.save();

        // Tạo ra một bản ghi mới với các trường giống nhau nhưng có thể thay đổi một số trường
        const newSale = new FlashSale({
          product: sale.product,
          current_sale: sale.current_sale,
          date_sale: format(new Date().setDate(new Date().getDate() + 1),
          'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' }),
          point_sale: sale.point_sale,
          time_sale: sale.time_sale,
          num_sale: sale.num_sale,
          sold_sale: sale.sold_sale,
          is_loop: true,
        });
        await newSale.save();
        //console.log("Thêm thành công Flash Sale lặp lại: ", newSale.date_sale, newSale.is_loop, sale.date_sale, sale.is_loop);
      }
    } catch (err) {
      console.error('Lỗi khi kiểm tra và thêm fls lặp:', err);
    }
}

}



module.exports = new FlashSaleControllers();
