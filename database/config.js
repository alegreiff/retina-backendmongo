const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("BD CONNECCTTTEEDDD");
  } catch (error) {
    console.log(error);
    throw new error("Error en la consola de Mongo Atlas");
  }
};

module.exports = {
  dbConnection,
};
