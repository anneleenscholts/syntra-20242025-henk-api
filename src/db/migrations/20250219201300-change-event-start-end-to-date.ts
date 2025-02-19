import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export const up = async (
  queryInterface: QueryInterface,
  Sequelize: typeof DataTypes
) => {
  // Step 1: Create temporary columns
  await queryInterface.addColumn("Events", "start_temp", {
    type: Sequelize.DATE,
    allowNull: true,
  });
  await queryInterface.addColumn("Events", "end_temp", {
    type: Sequelize.DATE,
    allowNull: true,
  });

  // Step 2: Copy data to temporary columns
  await queryInterface.sequelize.query(`
    UPDATE "Events"
    SET "start_temp" = to_timestamp("start", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        "end_temp" = to_timestamp("end", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
  `);

  // Step 3: Drop original columns
  await queryInterface.removeColumn("Events", "start");
  await queryInterface.removeColumn("Events", "end");

  // Step 4: Rename temporary columns to original column names
  await queryInterface.renameColumn("Events", "start_temp", "start");
  await queryInterface.renameColumn("Events", "end_temp", "end");
};

/** @type {import('sequelize-cli').Migration} */
export const down = async (
  queryInterface: QueryInterface,
  Sequelize: typeof DataTypes
) => {
  // Step 1: Create temporary columns
  await queryInterface.addColumn("Events", "start_temp", {
    type: Sequelize.STRING,
    allowNull: true,
  });
  await queryInterface.addColumn("Events", "end_temp", {
    type: Sequelize.STRING,
    allowNull: true,
  });

  // Step 2: Copy data to temporary columns
  await queryInterface.sequelize.query(`
    UPDATE "Events"
    SET "start_temp" = to_char("start", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        "end_temp" = to_char("end", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
  `);

  // Step 3: Drop original columns
  await queryInterface.removeColumn("Events", "start");
  await queryInterface.removeColumn("Events", "end");

  // Step 4: Rename temporary columns to original column names
  await queryInterface.renameColumn("Events", "start_temp", "start");
  await queryInterface.renameColumn("Events", "end_temp", "end");
};
