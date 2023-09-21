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
  one: "",
  two: 2,
  three: null,
};

// cleanObj(obj);

export function HandlerUpdate(updateData: any, updateId : string){
const cleanUser = cleanObj(updateData)

const updateFields = Object.keys(cleanUser)
      .map((key) => `${key} = ?`)
      .join(', ');

const values = Object.values(cleanUser);
    values.push(updateId);

    return [updateFields,values]

}

// const [updateFields,values] = HandlerUpdate(userData,userId)
