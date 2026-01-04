import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Dataset = sequelize.define('Dataset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
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

Dataset.belongsTo(User, { foreignKey: 'userId' });
Dataset.belongsTo(Dataset, { as: 'parent', foreignKey: 'parentId' });

export default Dataset;
