import { useState, useEffect } from 'react';
import { modelService, datasetService } from '../services/api';
import TimeSeriesChart from '../components/TimeSeriesChart';

function Dashboard() {
  const [stats, setStats] = useState({ models: 0, datasets: 0, predictions: 0 });
  const [recentModels, setRecentModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [models, datasets] = await Promise.all([
        modelService.getAll(),
        datasetService.getAll(),
      ]);

      setStats({
        models: models.length,
        datasets: datasets.length,
        predictions: models.reduce((acc, m) => acc + (m.status === 'completed' ? 1 : 0), 0),
      });

      setRecentModels(models.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [12, 19, 15, 25, 22, 30],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Models</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.models}</p>
            </div>
            <div className="text-4xl">🤖</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Datasets</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.datasets}</p>
            </div>
            <div className="text-4xl">📁</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed Models</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.predictions}</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Time Series Overview</h2>
        <TimeSeriesChart data={sampleData} title="Sample Forecast Data" />
      </div>

      {/* Recent Models */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Models</h2>
        {recentModels.length === 0 ? (
          <p className="text-gray-400">No models yet. Create your first model!</p>
        ) : (
          <div className="space-y-4">
            {recentModels.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{model.name}</h3>
                  <p className="text-gray-400 text-sm">{model.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  model.status === 'completed' ? 'bg-green-900 text-green-200' :
                  model.status === 'training' ? 'bg-yellow-900 text-yellow-200' :
                  model.status === 'failed' ? 'bg-red-900 text-red-200' :
                  'bg-gray-600 text-gray-200'
                }`}>
                  {model.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
