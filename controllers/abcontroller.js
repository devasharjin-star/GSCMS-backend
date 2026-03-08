export const abcontroller = async (req, res) => {
  try {

    const user = req.user; // comes from auth middleware

    res.status(200).json({
      message: "Protected route accessed",
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};