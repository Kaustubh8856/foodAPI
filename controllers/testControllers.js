const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "test user API",
    });
  } catch (error) {
    console.log("error in test API", error);
  }
};

module.exports = { testUserController };
