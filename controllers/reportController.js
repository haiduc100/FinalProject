const writeXlsxFile = require("write-excel-file/node");
const RequestReturning = require("../models/requestReturn.model");

module.exports.getRequestReturnReport = async (req, res) => {
  const HEADER_ROW = [
    { value: "AssignmentId", fontWeight: "bold" },
    {
      value: "State",
      fontWeight: "bold",
    },
    {
      value: "Request By",
      fontWeight: "bold",
    },
    {
      value: "Accecpt By",
      fontWeight: "bold",
    },
  ];

  const data = [];
  data.push(HEADER_ROW);
  try {
    const request = await RequestReturning.find({})
      .populate("RequestBy")
      .populate("AccecptBy")
      .lean();
    request.map((value) => {
      data.push([
        { value: value.AssignmentId },
        { value: value.State },
        { value: value.RequestBy.StaffCode },
        { value: value.AccecptBy ? value.AccecptBy.StaffCode : null },
      ]);
    });
    await writeXlsxFile(data, {
      filePath: `./RequestReturningReport.xlsx`,
    });
    res.status(200).json({ message: "file was created successfully" });
  } catch (error) {
    console.log(error);
  }
};
