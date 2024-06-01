const cron = require("node-cron");
const Webinar = require("../models/webinarModel"); // Adjust the path accordingly

// Function to delete expired webinars
const deleteExpiredWebinars = async () => {
  const now = new Date();
  try {
    const result = await Webinar.deleteMany({ endTime: { $lt: now } });
    console.log(`${result.deletedCount} expired webinars deleted.`);
  } catch (err) {
    console.error("Error deleting expired webinars:", err);
  }
};

// Schedule the task to run every hour
cron.schedule("0 * * * *", () => {
  console.log("Running the scheduled task to delete expired webinars");
  deleteExpiredWebinars();
});

module.exports = deleteExpiredWebinars;
