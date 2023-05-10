const { pool } = require("./config");

const processErrorMessage = (err, message) => {
  let errorStackResponse = err.stack.split("\n")[0];
  let errorMessage = errorStackResponse ? errorStackResponse : message;
  return errorMessage;
};

const saveUserProfile = (request, response) => {
  const { email } = request.body.formValues;

  pool
    .query(`select * from user_profile where email=$1`, [email])
    .then((result) => {
      if (result?.rows[0]?.email) {
        updateUserProfile(request, response, email);
      } else {
        createUserProfile(request, response);
      }
    })
    .catch((err) => {
      response
        .status(501)
        .json(processErrorMessage(err, "Data Query could not be processed"));
    });
};

const updateUserProfile = (request, response) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    workPhone,
    personalPhone,
    location,
  } = request.body.formValues;

  try {
    pool
      .query(
        `UPDATE user_profile SET first_name = $1,
         last_name = $2, display_name = $3, 
         work_phone = $4, personal_phone = $5, location = $6
         where email = $7`,
        [
          firstName,
          lastName,
          displayName,
          workPhone,
          personalPhone,
          location,
          email,
        ]
      )
      .then((result) => {
        response.status(201).send(`User updated with Email Name: ${email}`);
      })
      .catch((err) => {
        response
          .status(501)
          .json(processErrorMessage(err, "Data Query could not be processed"));
      });
  } catch {
    response.status(501).send("Error Inserting Data");
  }
};

const createUserProfile = (request, response) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    workPhone,
    personalPhone,
    location,
  } = request.body.formValues;

  try {
    pool
      .query(
        `INSERT INTO user_profile( first_name, last_name, display_name, email, work_phone, personal_phone, location)
          VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [
          firstName,
          lastName,
          displayName,
          email,
          workPhone,
          personalPhone,
          location,
        ]
      )
      .then((result) => {
        response
          .status(201)
          .send(`User added with Display Name: ${result.rows[0].display_name}`);
      })
      .catch((err) => {
        response
          .status(501)
          .json(processErrorMessage(err, "Data Query could not be processed"));
      });
  } catch {
    response.status(501).send("Error Inserting Data");
  }
};

module.exports = {
  createUserProfile,
  saveUserProfile,
};
