const express = require("express");
const villagePeopleRoute =
  express.Router();
const VerifyToken = require(
  "../../../Middleware/verifyToken"
);

const {
  createVillagePersonController,
  getAllVillagePeopleController,
  getSingleVillagePersonController,
  updateVillagePersonController,
  deleteVillagePersonController,
  addSpouseController,
  addChildController,
  getFamilyTreeController,
} = require("./controller");

// ======================================================
// CREATE PERSON
// ======================================================

villagePeopleRoute.post(
  "/",
  VerifyToken,
  createVillagePersonController
);

// ======================================================
// GET ALL PEOPLE
// ======================================================

villagePeopleRoute.get(
  "/",
  getAllVillagePeopleController
);

// ======================================================
// GET SINGLE PERSON
// ======================================================

villagePeopleRoute.get(
  "/:id",
  getSingleVillagePersonController
);

// ======================================================
// UPDATE PERSON
// ======================================================

villagePeopleRoute.put(
  "/:id",
  VerifyToken,
  updateVillagePersonController
);

// ======================================================
// DELETE PERSON
// ======================================================

villagePeopleRoute.delete(
  "/:id",
  VerifyToken,
  deleteVillagePersonController
);

// ======================================================
// ADD SPOUSE
// ======================================================

villagePeopleRoute.put(
  "/add-spouse/:id",
  VerifyToken,
  addSpouseController
);

// ======================================================
// ADD CHILD
// ======================================================

villagePeopleRoute.put(
  "/add-child/:id",
  VerifyToken,
  addChildController
);

// ======================================================
// FAMILY TREE
// ======================================================

villagePeopleRoute.get(
  "/family/tree/:id",
  getFamilyTreeController
);

module.exports = villagePeopleRoute;