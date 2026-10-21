import React, { useState } from 'react';
import { Target, Plus, TrendingUp, CheckCircle2, X } from 'lucide-react';

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: 'New Laptop', target: 50000, saved: 15000, color: 'bg-blue-500' },
    { id: 2, title: 'Emergency Fund', target: 20000, saved: 18000, color: 'bg-green-500' },
    { id: 3, title: 'Holiday Trip', target: 100000, saved: 5000, color: 'bg-purple-500' },
  ]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoal = {
      id: Date.now(),
      title: formData.get('title'),
      target: Number(formData.get('target')),
      saved: 0,
      color: 'bg-[#dc2626]'
    };
    setGoals([...goals, newGoal]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Goals</h2>
          <p className="text-sm text-gray-500 mt-1">Set targets and track your savings progress.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.saved / goal.target) * 100), 100);
          return (
            <div key={goal.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{goal.title}</h3>
                    <p className="text-xs text-gray-500">Target: KSh {goal.target.toLocaleString()}</p>
                  </div>
                </div>
                {percentage >= 100 && (
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Achieved
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-900">KSh {goal.saved.toLocaleString()}</span>
                  <span className="text-gray-500 font-medium">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${goal.color}`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors">
                Add Funds
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Create New Goal</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddGoal} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                <input name="title" type="text" required placeholder="e.g. School Fees" className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (KSh)</label>
                <input name="target" type="number" required placeholder="e.g. 50000" className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors mt-2">
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
