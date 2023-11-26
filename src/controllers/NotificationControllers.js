const crypto = require('crypto')
const configWebPush = require('../config/webpush')
const responeObject = require("../models/responeObject");
const Notification = require('../models/Notification');
const UserNotification = require('../models/UserNotification');
const webpush = require('web-push')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const constants = require('../../constant/api.js')

const resObj = new responeObject("", "", {});

configWebPush()

class NotificationControllers {

    // Đăng ký việc đẩy thông báo
    async handlePushNotificationSubcription(req, res) {
        try {
            const subscription = req.body.subscription;
            const token = req.body.token

            //console.log(subscription)

            const decoded = jwt.verify(token, constants.TOKEN_KEY)
            const user = await User.findOne({ _id: decoded.user_id })
            user.sw_id = subscription
            await user.save()

            //console.log("user: ", user)

            resObj.status = 'OK'
            resObj.message = 'success'
            res.json(resObj);
        } catch (err) {
            console.log(err)
            resObj.status = 'Failure'
            resObj.message = 'Internal Server Error. Please contact admin'
            res.json(resObj);
        }
    }

    // Gửi thông báo
    async sendPushNotification(req, res) {
        try {
            const filter = req.body.filter
            const notification = new Notification({ ...req.body.notification })
            await notification.save()
            if (filter === "all") {
                const listUsers = await User.find().exec()
                listUsers.forEach(async (user) => {
                    if (user.sw_id) {
                        webpush.sendNotification(
                            user.sw_id,
                            JSON.stringify(notification)
                        )
                    }
                    const userNotification = new UserNotification({
                        user: user._id,
                        notification: notification._id
                    })

                    await userNotification.save()
                })
            } else if (filter === 'admin') {
                const listUsers = await User.find().exec()
                listUsers.forEach(async (user) => {
                    if (user.isManager) {
                        if (user.sw_id) {
                            webpush.sendNotification(
                                user.sw_id,
                                JSON.stringify(notification)
                            )
                        }
                        const userNotification = new UserNotification({
                            user: user._id,
                            notification: notification._id
                        })

                        await userNotification.save()
                    }
                })
            } else {
                const user = await User.findOne({ _id: notification.user }).exec()

                if (user.sw_id) {
                    webpush.sendNotification(
                        user.sw_id,
                        JSON.stringify(notification)
                    )
                }
                const userNotification = new UserNotification({
                    user: user._id,
                    notification: notification._id
                })

                await userNotification.save()
            }

            resObj.status = 'OK'
            resObj.message = 'Send notification successfully'
            resObj.data = {}
            res.status(200).json(resObj);

        } catch (error) {
            resObj.status = 'Failure'
            resObj.message = error.message
            resObj.data = {}
            res.status(201).json(resObj);
        }
    }

    // Lấy tất cả thông báo của user
    async getAllNotificationsByUser(req, res) {
        try {
            const user_id = req.body.id
            const list = await UserNotification.find({ user: user_id })
                .populate("notification")
                .sort({ updatedAt: -1 })
                .exec()

            resObj.status = "OK"
            resObj.message = "Get notifications successfully"
            resObj.data = list
            res.json(resObj)
        } catch (err) {
            resObj.status = "Failure"
            resObj.message = "Internal Server Error. Please contact admin"
            res.json(resObj)
        }
    }

    // Lấy tất cả thông báo
    async getAllNotifications(req, res) {
        try {
            const list = await Notification.find()
                .sort({ updatedAt: -1 })
                .exec()

            resObj.status = "OK"
            resObj.message = "Get notifications successfully"
            resObj.data = list
            res.json(resObj)
        } catch (err) {
            resObj.status = "Failure"
            resObj.message = "Internal Server Error. Please contact admin"
            res.json(resObj)
        }
    }

    async updateUserNotification(req, res) {
        try {
            const id = req.body.id
            const userNotification = await UserNotification.findOne({ _id: id }).exec()
            userNotification.isAccess = true

            userNotification.save()

            resObj.status = "OK"
            resObj.message = "Update success"
            resObj.data = {}
            res.json(resObj)
        } catch (err) {
            resObj.status = "Failure"
            resObj.message = "Internal Server Error. Please contact admin"
            resObj.data = {}
        }
    }
}

module.exports = new NotificationControllers()
