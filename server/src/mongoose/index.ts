import mongoose from 'mongoose';

const mongoBdConnect = (uri: string) => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  return mongoose.connect(uri, options);
};

export default mongoBdConnect;
