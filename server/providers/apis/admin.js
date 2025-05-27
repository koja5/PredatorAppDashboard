require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "24h";
const logger = require("../config/logger");
const request = require("request");
const fs = require("fs");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const auth = require("../config/authentification/auth-admin");
const sql = require("../config/sql-database");
const userType = require("./enums/user-type");
const makeRequest = require("./help-function/makeRequest");

module.exports = router;

var connection = sql.connect();

connection.getConnection(function (err, conn) {});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

//#region MY USERS

router.get("/getMyUsers", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        console.log(req.user.user.id);
        conn.query(
          "select u.id, u.id_area, u.firstname, u.lastname, u.gender, u.phone, u.email, u.type, u.verify, u.active, u.trusted from users u left join all_areas a on u.id_area = a.id where a.id_admin = ? and type != ? and type != ?",
          [req.user.user.id, userType.admin, userType.superadmin],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setUser", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    if (
      !isValidSHA1(req.body.password) ||
      (!req.body.id && req.body.password)
    ) {
      req.body.password = sha1(req.body.password);
    }

    req.body.id_admin = req.user.user.id;

    conn.query(
      "select * from users where id = ?",
      [req.body.id],
      function (err, rows) {
        if (!err) {
          if (rows.length && !rows[0].trusted && req.body.trusted) {
            conn.query(
              "UPDATE predators set visible = 1 where id_user = ?",
              [req.body.id],
              function (err, rows) {
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(false);
                }
              }
            );
          }
          conn.query(
            "INSERT INTO users set ? ON DUPLICATE KEY UPDATE ?",
            [req.body, req.body],
            function (err, rows) {
              conn.release();
              if (!err) {
                res.json(true);
              } else {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              }
            }
          );
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post("/deleteUser", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "delete from users where id = ? and id_admin = ?",
          [req.body.id, req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getUserType", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from user_type where id = ? or id = ?",
          [userType.user, userType.natureProtectionUser],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region AREAS

router.get("/getMyAreas", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from all_areas where id_admin = ?",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region PREDATORS

router.get("/getPredators", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        console.log(req.user.user.id);
        conn.query(
          "select p.* from predators p join users u on p.id_user = u.id left join all_areas a on u.id_area = a.id where u.id_admin = ? or a.id_admin = ?",
          [req.user.user.id, req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPredatorRequests", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        console.log(req.user.user.id);
        conn.query(
          "select p.*, ap.name as 'predator_name', aw.name as 'water', afd.name as 'fish_district', aa.name as 'activity', CONCAT(u.firstname, ' ', u.lastname) as 'client_name', u.email, u.phone from predators p left join all_predators ap on p.id_predator = ap.id left join all_waters aw on p.id_water = aw.id left join all_fish_districts afd on p.id_fish_district = afd.id left join all_activities aa on p.id_activity = aa.id join users u on p.id_user = u.id where u.id_admin = ? and p.completed = 1 order by p.creation_date desc",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setPredatorToVisible", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "update predators set visible = 1 where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deletePredator", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "delete from predators where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPredatorById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select DISTINCT p.*, CONCAT(u.firstname, ' ', u.lastname) as 'client_name', ap.name as 'predator_name', aw.name as 'water_name', afd.name as 'fish_district', aa.name 'activity' from predators p join users u on p.id_user = u.id left join all_predators ap on p.id_predator = ap.id left join all_waters aw on p.id_water = aw.id left join all_fish_districts afd on p.id_fish_district = afd.id left join all_activities aa on p.id_activity = aa.id where p.id = ? and u.id_admin = ?",
          [req.params.id, req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows.length ? rows[0] : {});
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region ALL FISH DISTRICTS

router.get("/getAllFishDistricts", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select afd.* from all_fish_districts afd join all_areas aa on afd.id_area = aa.id where aa.id_admin = ?",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setFishDistrict", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "select * from all_areas where id_admin = ?",
      [req.user.user.id],
      function (err, rows) {
        if (!err) {
          if (rows.length) {
            req.body.id_area = rows[0].id;
          }
          conn.query(
            "INSERT INTO all_fish_districts set ? ON DUPLICATE KEY UPDATE ?",
            [req.body, req.body],
            function (err, rows) {
              conn.release();
              if (!err) {
                res.json(true);
              } else {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              }
            }
          );
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post("/deleteFishDistrict", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select afd.*, aa.name as 'area_name' from all_fish_districts afd left join all_areas aa on afd.id_area = aa.id where afd.id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              if (rows.length) {
                rows[0]["admin"] =
                  req.user.user.firstname + " " + req.user.user.lastname;
                makeRequest(
                  rows[0],
                  "mail/requestToApproveDeleteFishDistrict",
                  res
                );
              } else {
                res.json(false);
              }
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region AREA SETTINGS

router.get("/getAreaSettings", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select a.* from area_settings a left join users u on a.id_area = u.id_area where u.id = ?",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setAreaSettings", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "select * from all_areas where id_admin = ?",
      [req.user.user.id],
      function (err, rows) {
        if (!err) {
          if (rows.length) {
            req.body.id_area = rows[0].id;
          }
          console.log(req.body);
          conn.query(
            "INSERT INTO area_settings set ? ON DUPLICATE KEY UPDATE ?",
            [req.body, req.body],
            function (err, rows) {
              conn.release();
              if (!err) {
                res.json(true);
              } else {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              }
            }
          );
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post("/deleteAreaSettings", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "delete from all_fish_districts where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region HELP FUNCTION

function isValidSHA1(s) {
  if (s) {
    return s.indexOf("^[a-fA-F0-9]{40}$") == 1;
  } else {
    if (!s) return true;
    else return false;
  }
}

//#endregion
