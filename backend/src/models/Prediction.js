import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import MLModel from './MLModel.js';

const Prediction = sequelize.define('Prediction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  input: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  output: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  confidence: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  modelId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'MLModels',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Prediction.belongsTo(User, { foreignKey: 'userId' });
Prediction.belongsTo(MLModel, { foreignKey: 'modelId' });

export default Prediction;
