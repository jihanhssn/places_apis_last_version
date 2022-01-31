'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("amenities", {
		amenity_id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		amenity: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name_en: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		name_ar: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		s3_id: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		visible:{
			type:Sequelize.BOOLEAN,
			allowNull:false,
			defaultValue:false
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
  },
  {} )
},
  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.dropTable('amenities');
     
  }
};
