import { useState, useEffect } from 'react';
import { datasetService } from '../services/api';

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    data: '',
  });

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const data = await datasetService.getAll();
      setDatasets(data);
    } catch (error) {
      console.error('Failed to load datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(formData.data);
      await datasetService.create({
        name: formData.name,
        description: formData.description,
        data: parsedData,
      });
      setShowForm(false);
      setFormData({ name: '', description: '', data: '' });
      loadDatasets();
    } catch (error) {
      alert('Failed to create dataset: ' + (error.message || 'Invalid JSON'));
    }
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Datasets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Cancel' : '+ New Dataset'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Create New Dataset</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Data (JSON format)</label>
              <textarea
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
                rows="6"
                placeholder='{"values": [1, 2, 3, 4, 5]}'
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
            >
              Create Dataset
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white font-semibold text-lg mb-2">{dataset.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{dataset.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">
                Version {dataset.version}
              </span>
              <span className="text-gray-500 text-xs">
                {new Date(dataset.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {datasets.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No datasets yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
          >
            Create Your First Dataset
          </button>
        </div>
      )}
    </div>
  );
}

export default Datasets;
