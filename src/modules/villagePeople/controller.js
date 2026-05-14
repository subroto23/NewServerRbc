// ======================================================
// CONTROLLER FILE
// File:
// controller.js
// ======================================================

const createHttpError = require(
  "http-errors"
);

const { ObjectId } = require(
  "mongodb"
);

const {
  villagePeople,
} = require("../../Dbconfig/DatabaseConfig");

// ======================================================
// CREATE PERSON
// ======================================================

const createVillagePersonController =
  async (req, res, next) => {
    try {
      const {
        name,
        gender,
        fatherId,
        motherId,
        mobile,
        whatsapp,
        facebook,
        email,
        occupation,
        dateOfBirth,
        dateOfDeath,
        bloodGroup,
        nid,
        profileImage,
      } = req.body;

      // ============================================
      // VALIDATION
      // ============================================

      if (!name) {
        throw createHttpError(
          400,
          "Name is required"
        );
      }

      // ============================================
      // DATA
      // ============================================

      const data = {
        name,

        gender: gender || "",

        fatherId: fatherId
          ? new ObjectId(fatherId)
          : null,

        motherId: motherId
          ? new ObjectId(motherId)
          : null,

        spouseIds: [],

        childrenIds: [],

        mobile: mobile || "",

        whatsapp: whatsapp || "",

        facebook: facebook || "",

        email: email || "",

        occupation: occupation || "",

        bloodGroup: bloodGroup || "",

        nid: nid || "",

        profileImage:
          profileImage || "",

        dateOfBirth:
          dateOfBirth || null,

        dateOfDeath:
          dateOfDeath || null,

        isAlive: dateOfDeath
          ? false
          : true,

        createdAt: new Date(),

        updatedAt: new Date(),
      };

      // ============================================
      // INSERT
      // ============================================

      const result =
        await villagePeople.insertOne(
          data
        );

      // ============================================
      // UPDATE FATHER
      // ============================================

      if (fatherId) {
        await villagePeople.updateOne(
          {
            _id: new ObjectId(
              fatherId
            ),
          },
          {
            $addToSet: {
              childrenIds:
                result.insertedId,
            },
          }
        );
      }

      // ============================================
      // UPDATE MOTHER
      // ============================================

      if (motherId) {
        await villagePeople.updateOne(
          {
            _id: new ObjectId(
              motherId
            ),
          },
          {
            $addToSet: {
              childrenIds:
                result.insertedId,
            },
          }
        );
      }

      return res.status(201).json({
        success: true,

        message:
          "Person created successfully",

        insertedId:
          result.insertedId,
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// GET ALL PEOPLE
// ======================================================

const getAllVillagePeopleController =
  async (req, res, next) => {
    try {
      const result =
        await villagePeople
          .find({})
          .sort({ name: 1 })
          .toArray();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// GET SINGLE PERSON
// ======================================================

const getSingleVillagePersonController =
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const person =
        await villagePeople.findOne({
          _id: new ObjectId(id),
        });

      if (!person) {
        throw createHttpError(
          404,
          "Person not found"
        );
      }

      // ============================================
      // FATHER
      // ============================================

      let father = null;

      if (person.fatherId) {
        father =
          await villagePeople.findOne({
            _id: person.fatherId,
          });
      }

      // ============================================
      // MOTHER
      // ============================================

      let mother = null;

      if (person.motherId) {
        mother =
          await villagePeople.findOne({
            _id: person.motherId,
          });
      }

      // ============================================
      // SPOUSES
      // ============================================

      let spouses = [];

      if (
        person.spouseIds &&
        person.spouseIds.length > 0
      ) {
        spouses =
          await villagePeople
            .find({
              _id: {
                $in:
                  person.spouseIds,
              },
            })
            .toArray();
      }

      // ============================================
      // CHILDREN
      // ============================================

      let children = [];

      if (
        person.childrenIds &&
        person.childrenIds.length > 0
      ) {
        children =
          await villagePeople
            .find({
              _id: {
                $in:
                  person.childrenIds,
              },
            })
            .toArray();
      }

      return res.status(200).json({
        success: true,

        data: {
          ...person,

          father,

          mother,

          spouses,

          children,
        },
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// UPDATE PERSON
// ======================================================

const updateVillagePersonController =
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updateData = {
        ...req.body,

        updatedAt: new Date(),
      };

      // ============================================
      // OBJECT ID CONVERT
      // ============================================

      if (updateData.fatherId) {
        updateData.fatherId =
          new ObjectId(
            updateData.fatherId
          );
      }

      if (updateData.motherId) {
        updateData.motherId =
          new ObjectId(
            updateData.motherId
          );
      }

      // ============================================
      // UPDATE
      // ============================================

      await villagePeople.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updateData,
        }
      );

      return res.status(200).json({
        success: true,

        message:
          "Person updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// DELETE PERSON
// ======================================================

const deleteVillagePersonController =
  async (req, res, next) => {
    try {
      const { id } = req.params;

      await villagePeople.deleteOne({
        _id: new ObjectId(id),
      });

      return res.status(200).json({
        success: true,

        message:
          "Person deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// ADD SPOUSE
// ======================================================

const addSpouseController = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const { spouseId } = req.body;

    if (!spouseId) {
      throw createHttpError(
        400,
        "Spouse ID is required"
      );
    }

    // ============================================
    // UPDATE PERSON
    // ============================================

    await villagePeople.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $addToSet: {
          spouseIds:
            new ObjectId(
              spouseId
            ),
        },
      }
    );

    // ============================================
    // UPDATE SPOUSE
    // ============================================

    await villagePeople.updateOne(
      {
        _id: new ObjectId(
          spouseId
        ),
      },
      {
        $addToSet: {
          spouseIds:
            new ObjectId(id),
        },
      }
    );

    return res.status(200).json({
      success: true,

      message:
        "Spouse added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// ADD CHILD
// ======================================================

const addChildController = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const { childId } = req.body;

    if (!childId) {
      throw createHttpError(
        400,
        "Child ID is required"
      );
    }

    // ============================================
    // GET PARENT
    // ============================================

    const parent =
      await villagePeople.findOne({
        _id: new ObjectId(id),
      });

    if (!parent) {
      throw createHttpError(
        404,
        "Parent not found"
      );
    }

    // ============================================
    // UPDATE PARENT
    // ============================================

    await villagePeople.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $addToSet: {
          childrenIds:
            new ObjectId(childId),
        },
      }
    );

    // ============================================
    // UPDATE CHILD
    // ============================================

    if (
      parent.gender === "Male"
    ) {
      await villagePeople.updateOne(
        {
          _id: new ObjectId(
            childId
          ),
        },
        {
          $set: {
            fatherId:
              new ObjectId(id),
          },
        }
      );
    } else {
      await villagePeople.updateOne(
        {
          _id: new ObjectId(
            childId
          ),
        },
        {
          $set: {
            motherId:
              new ObjectId(id),
          },
        }
      );
    }

    return res.status(200).json({
      success: true,

      message:
        "Child added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// FAMILY TREE
// ======================================================

const getFamilyTreeController =
  async (req, res, next) => {
    try {
      const { id } = req.params;

      // ============================================
      // PERSON
      // ============================================

      const person =
        await villagePeople.findOne({
          _id: new ObjectId(id),
        });

      if (!person) {
        throw createHttpError(
          404,
          "Person not found"
        );
      }

      // ============================================
      // FATHER
      // ============================================

      let father = null;

      if (person.fatherId) {
        father =
          await villagePeople.findOne({
            _id: person.fatherId,
          });
      }

      // ============================================
      // MOTHER
      // ============================================

      let mother = null;

      if (person.motherId) {
        mother =
          await villagePeople.findOne({
            _id: person.motherId,
          });
      }

      // ============================================
      // SPOUSES
      // ============================================

      let spouses = [];

      if (
        person.spouseIds &&
        person.spouseIds.length > 0
      ) {
        spouses =
          await villagePeople
            .find({
              _id: {
                $in:
                  person.spouseIds,
              },
            })
            .toArray();
      }

      // ============================================
      // CHILDREN
      // ============================================

      let children = [];

      if (
        person.childrenIds &&
        person.childrenIds.length > 0
      ) {
        children =
          await villagePeople
            .find({
              _id: {
                $in:
                  person.childrenIds,
              },
            })
            .toArray();
      }

      return res.status(200).json({
        success: true,

        data: {
          person,

          father,

          mother,

          spouses,

          children,
        },
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createVillagePersonController,

  getAllVillagePeopleController,

  getSingleVillagePersonController,

  updateVillagePersonController,

  deleteVillagePersonController,

  addSpouseController,

  addChildController,

  getFamilyTreeController,
};