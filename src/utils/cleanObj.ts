export function cleanObj(value: any) {
  Object.keys(value).forEach((key) => {
    if (!value[key]) {
      delete value[key];
    }
  });
  //   console.log(value);

  return value;
}

const obj = {
  one: "alguma coisa",
  two: 2,
  three: null,
};

// cleanObj(obj);

export function HandlerUpdate(updateData: any, updateId: string) {
  const cleanUser = cleanObj(updateData);

  const updateFields = Object.keys(cleanUser)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(cleanUser);
  values.push(updateId);

  return [updateFields, values];
}

// const [updateFields,values] = HandlerUpdate(userData,userId)

export function HandlerInsert(insertData: any) {
  const cleanData = cleanObj(insertData);

  const insertFields = Object.keys(cleanData).join(", ");
  const placeholders = Object.keys(cleanData)
    .map(() => "?")
    .join(", ");
  const values = Object.values(cleanData);

  return [insertFields, placeholders, values];
}

/* const [insertFields, placeholders, values] = HandlerInsert(obj);

console.log(insertFields);
console.log(values);
console.log(placeholders); */
