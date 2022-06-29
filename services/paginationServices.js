exports.Paginate = async (model, options, sort, page, pageSize, populate) => {
  let test = model
    .find(options)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort(sort);
  for (let i = 0; i < populate.length; i++) {
    test = test.populate(populate[i]);
  }
  const data = await test;
  const totalData = await model.count({ options });

  const totalPages = Math.ceil(totalData / pageSize);

  return {
    totalPages,
    totalData,
    data,
  };
};
