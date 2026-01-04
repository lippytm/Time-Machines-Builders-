import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import Dataset from './Dataset.js';

const MLModel = sequelize.define('MLModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('time-series', 'nlp', 'classification', 'regression'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'training', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  parameters: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  metrics: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  modelPath: {
    type: DataTypes.STRING,
  },
  datasetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Datasets',
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

MLModel.belongsTo(User, { foreignKey: 'userId' });
MLModel.belongsTo(Dataset, { foreignKey: 'datasetId' });

export default MLModel;
