module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      sheet: [
        {
          question: {
            type: String,
            required: true,
          },
          options: [
            {
              name: {
                type: String,
              },
              isChecked: {
                type: Boolean,
              },
            },
          ],
        },
      ],
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model('sheetData', schema);
  return Tutorial;
};
