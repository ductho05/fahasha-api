const express = require("express")
const router = express.Router()
const NotificationControllers = require('../controllers/NotificationControllers')

router.post("/subscription", NotificationControllers.handlePushNotificationSubcription)
router.post("/send", NotificationControllers.sendPushNotification)
router.post("/get", NotificationControllers.getAllNotificationsByUser)
router.post("/update", NotificationControllers.updateUserNotification)
router.get("/get-all", NotificationControllers.getAllNotifications)

module.exports = router