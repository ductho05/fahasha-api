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
